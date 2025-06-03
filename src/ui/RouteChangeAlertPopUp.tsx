import CrossIcon from "@public/assets/CrossIcon";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "src/ui/button";
import { navigationStore } from "src/zustandStore/navigationStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Text } from "./text";

const RouteChangeAlertPopUp = () => {
  const router = useRouter();

  const { t } = useTranslation(["bx_v3", "common", "auth", "bx_v6"]);

  const [isLoading, setIsLoading] = useState(false);

  const { setRouteChangeModalOpen, routeChangeModalOpen, url, setUrl } =
    navigationStore();

  //when user clicked on the 'ok' button then user should navigate to corresponding page.
  const handleContinue = () => {
    // show the loader before navigating if user clicks the 'ok' button
    setIsLoading(true);
    router.push(url).then(() => {
      // when ever the route change then we need to close the alert and stop the loader
      setRouteChangeModalOpen(false);
      setIsLoading(false);
      setUrl("");
    });
  };

  //when user clicked on the 'cancel' button then user stay back on the same page with changes user done.
  const handleCancel = () => {
    // we need to close the alert and stay back on same page
    setRouteChangeModalOpen(false);
    router.events.emit("routeChangeError");
    throw "Route change aborted. User confirmation required.";
  };
  return (
    <Dialog open={routeChangeModalOpen} onOpenChange={setRouteChangeModalOpen}>
      <DialogContent className="top-[125px] w-[465px]" closeIcon={false}>
        <DialogHeader>
          <DialogTitle>
            <Text size="18" weight="600">
              {t("bx_v6:cm_leave_page")}
            </Text>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center leading-5 text-black">
          <Text>
            {t(
              "bx_v3:cm_changes_made_will_be_lost._are_you_sure_you_want_to_navigate_to_other_page"
            )}
          </Text>
        </DialogDescription>
        <DialogFooter className="mt-5 w-full justify-center !space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {t("common:cancel_button")}
          </Button>
          <Button
            type="button"
            isLoading={isLoading}
            className={`${isLoading ? "bg-white" : "bg-primary"} border-[1px] border-primary`}
            variant="primary"
            onClick={handleContinue}
            disabled={isLoading} // when user clicked on the ok button then we should not allow the user for other actions
          >
            {/* if user clicked on the ok then we need to show the loader*/}
            {isLoading ? (
              <div className="loader-small">
                <div className="loader"></div>
              </div>
            ) : (
              <p>{t("auth:ok")}</p>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RouteChangeAlertPopUp;
