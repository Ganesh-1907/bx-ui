import { useTranslation } from "next-i18next";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { staticDataStore } from "src/zustandStore/StaticDataStore";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Text } from "./text";

// Multi lingual support inputs component dialog
export const MultiLingualSupportInputs = ({
  open,
  setOpen,
  title,
  handleSave,
  temporaryValue,
  handleInputChange,
  errors,
  disabled = false,
}: {
  open: boolean; // boolean to open or close the dialog
  setOpen: (open: boolean) => void; // function to change whether to open or close the dialog
  title: string; // title of the dialog
  handleSave: () => void; // function to handle when the user click on save button by validating and closing the dialog
  temporaryValue: {
    [key: string]: string;
  }; // temporary value of the language inputs
  handleInputChange: (languageCode: string, val: string) => void; // function to handle when the user change the value of the language inputs
  errors?:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          [x: string]: string;
        }>
      >
    | undefined; // errors of the language inputs
  disabled?: boolean;
}) => {
  const { t } = useTranslation(["common", "event-add", "event-list"]);

  const { staticData } = staticDataStore();

  const languagesData =
    staticData?.countryConfigData?.localization_available_languages;

  // function to handle when the user click on cancel button
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="h-auto w-[718px]"
          handleClickCloseButton={() => setOpen(false)}
          closeIcon={true}
        >
          <DialogHeader className="h-7">
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-6">
            <div className="flex flex-wrap gap-x-[30px] gap-y-6">
              {languagesData?.map((item: localizationLanguagesDataBaseType) => (
                <div className="flex min-h-20 min-w-80 flex-col gap-1">
                  <Text className="flex h-4 flex-row items-center gap-1 text-xs">
                    {item?.language} <Text className="text-primary">*</Text>
                  </Text>
                  <Input
                    placeholder={`${t("common:enter")} ${title}`}
                    value={temporaryValue?.[item?.code || "en"]}
                    onChange={(e) => {
                      handleInputChange(item?.code as string, e.target.value);
                    }}
                    className="rounded-xl text-sm text-[#333333]"
                    error={
                      errors?.[item?.code as string] ||
                      (!temporaryValue[item?.code as string] && errors?.message)
                        ? true
                        : false
                    }
                    disabled={disabled}
                  />
                  {errors && (
                    <Text className="!w-80 break-all text-red" size={"12"}>
                      {errors?.[item?.code as string]?.message ||
                        (!temporaryValue[item?.code as string] &&
                          (errors?.message as unknown as string))}
                    </Text>
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="mt-5 flex gap-2">
              <Button onClick={handleCancel} variant={"secondary"}>
                {t("cancel_button")}
              </Button>
              {!disabled ? (
                <Button onClick={handleSave} variant={"primary"}>
                  {t("save_button")}
                </Button>
              ) : (
                ""
              )}
            </DialogFooter>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
