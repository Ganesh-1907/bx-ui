import DiscountErrorMessage from "@public/icons/DiscountErrorMessage";
import DiscountSuccessGreenTick from "@public/icons/DiscountSuccessGreenTick";
import { useOne } from "@refinedev/core";
import { FunctionsFetchError, FunctionsHttpError } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ManualRegistrationFormNames } from "src/constants/ManualRegistrationConstants";
import { objectToQueryParams, supabaseClient } from "src/utility";
import { formatAmount } from "src/utility/CurrencyFormat";
import useGetCountryCode from "src/utility/useGetCountryCode";
import { useMVPSelect } from "src/utility/useMVPSelect";
import { optionLabelValueStore } from "src/zustandStore/OptionLabelValueStore";
import { ParticipantStore } from "src/zustandStore/ParticipantStore";
import { staticDataStore } from "src/zustandStore/StaticDataStore";
import { Button } from "./button";
import { Input } from "./input";
export function DiscountCodeInput({
  value,
  onChange,
  getData,
  error,
}: {
  value: string;
  onChange: (val: string) => void;
  getData: (val: string) => void;
  error?: any;
}) {
  const { t } = useTranslation([
    "bx_v1",
    "bx_v2",
    "course.participants",
    "common",
    "bx_v5",
  ]);
  const { query } = useRouter();
  const { optionLabelValue } = optionLabelValueStore();
  const programFeeLevel = optionLabelValue?.program_fee_level;
  const {
    SetIsDiscountCodeApplied,
    isDiscountCodeApplied,
    isEarlyBirdEnabled,
  } = ParticipantStore();
  const { watch, clearErrors } = useFormContext();
  const supabase = supabaseClient();
  const manualRegFormData = watch();
  const countryCode = useGetCountryCode();
  const { staticData } = staticDataStore();
  const { countryConfigData } = staticData;
  const [isLoading, setIsLoading] = useState(false);

  const countryLanguageCodes =
    staticData?.countryConfigData?.localization_available_languages?.map(
      (lang) => lang?.code
    );

  // Preparing the discount code body
  const discountCodeBody = {
    programId: manualRegFormData?.program_data?.id,
    discountCode: manualRegFormData?.discount_code,
    languages: countryLanguageCodes,
    programParticipantInfo: {
      feeLevel: manualRegFormData?.fee_level_obj?.fee_level,
      emailId: manualRegFormData?.contact_obj?.email,
      earlyBirdEnabled: isEarlyBirdEnabled,
    },
  };

  const handleClickApply = async () => {
    setIsLoading(true);

    // Invoke the functions to get the discount code details
    const { data: discountCodeResponse, error: discountCodeError } =
      await supabase.functions.invoke("discount-code-validation", {
        method: "POST",
        body: discountCodeBody,
      });

    // Check if there is error while Fetching the discount code data
    if (discountCodeError) {
      console.error("Error while fetching discount code details:", error);
    }

    // Set the discount code data to call back function, if there is no error
    if (!discountCodeError) {
      getData(discountCodeResponse);
    }

    setIsLoading(false);
  };

  // Automatically applies the discount when the accommodation type changes, if both accommodation type and discount code are present.
  useEffect(() => {
    if (
      manualRegFormData?.accommodation_type_obj &&
      isDiscountCodeApplied === "success"
    ) {
      handleClickApply();
    }
  }, [manualRegFormData?.accommodation_type_obj]);

  const handleClickRemove = () => {
    onChange("");
    getData("");
    clearErrors([ManualRegistrationFormNames?.deposit_option]);
  };

  // Triggers the removal of the discount when the discount code application status changes to "open".
  // Use Case: Accommodation fee doesn't revert to original price after discount code removal.
  useEffect(() => {
    if (isDiscountCodeApplied === "open") {
      handleClickRemove();
    }
  }, [isDiscountCodeApplied]);

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[white]/50 opacity-100">
          <div className="loader"></div>
        </div>
      )}
      <div
        className={`flex h-10 w-full items-center rounded-xl border ${error ? "border-[#FF6D6D]" : "border-[#E1E1E1]"} `}
      >
        <Input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className="m-1 h-9 rounded-xl border-none bg-white focus:outline-none"
          disabled={isDiscountCodeApplied !== "open"}
        />
        {isDiscountCodeApplied == "open" && (
          <Button
            variant={"plain"}
            onClick={() => {
              handleClickApply();
            }}
            className="!pr-3 text-sm font-medium leading-[18px] text-[#7677F4]"
            type="button"
            disabled={value && !error ? false : true}
          >
            {t("bx_v1:cpm_mr_apply")}
          </Button>
        )}
        {(isDiscountCodeApplied === "success" ||
          isDiscountCodeApplied === "error") && (
          <div className="flex items-center gap-2">
            {isDiscountCodeApplied === "success" ? (
              <DiscountSuccessGreenTick />
            ) : (
              <DiscountErrorMessage />
            )}
            <Button
              variant={"plain"}
              onClick={() => {
                handleClickRemove();
              }}
              className="!pr-3 text-sm font-medium leading-[18px] text-[#7677F4]"
              type="button"
            >
              {t("bx_v1:cpm_mr_discount_code_remove")}
            </Button>
          </div>
        )}
      </div>
      {isDiscountCodeApplied == "success" ? (
        <div className="py-2 text-xs text-[#44B741]">{`${t("bx_v5:cpm_save_money")} ${countryConfigData?.default_currency_code} ${formatAmount(manualRegFormData?.discounted_amount, countryConfigData?.thousands_separator, countryConfigData?.decimal_delimiter)}`}</div>
      ) : (
        ""
      )}
    </div>
  );
}
