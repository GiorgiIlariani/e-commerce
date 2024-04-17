"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deactivateFormSchema } from "@/lib/validator";
import { deleteUser } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useEffect, useState } from "react";
import { DeactivateAccountAlertDialog } from "@/components/shared/modals/DeeactivateAlertDialog";
import { logout } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const DeactivateForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("access-token");

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: user, refetch } = useRetrieveUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  const form = useForm<z.infer<typeof deactivateFormSchema>>({
    resolver: zodResolver(deactivateFormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof deactivateFormSchema>) {
    try {
      if (values.username !== user?.username) {
        toast.error(
          "Unauthorized username. Please log in with appropriate username to continue.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } else {
        setShowAlertDialog(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onDialogCorfirmation() {
    if (!accessToken) return;
    setIsRemoving(true);
    const status = await deleteUser(accessToken);
    form.reset();

    if (status === 204) {
      setIsRemoving(false);
      dispatch(logout());
      toast.success(
        "Account has beed deactivated, you will be redirected on home page soon!",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
      router.push("/");
    }
  }

  function onDialogRejection() {
    setShowAlertDialog(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-[#a3adc0]">
                  Username*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="input-field"
                    placeholder="Your username..."
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <div className="w-full flex  justify-end">
            <Button
              type="submit"
              className="bg-transparent rounded-lg py-[22px] text-[#8996ae] text-center font-medium hover:underline">
              გაუქმება
            </Button>
            <Button
              type="submit"
              className="bg-[#fec900] rounded-lg py-[22px] text-white text-center font-medium hover:bg-[#ffdb4d]">
              დადასტურება
            </Button>
          </div>
        </form>
      </Form>
      <DeactivateAccountAlertDialog
        open={showAlertDialog}
        onOpenChange={setShowAlertDialog}
        onDeleteAccount={onDialogCorfirmation}
        onCancel={onDialogRejection}
        isRemoving={isRemoving}
      />
    </>
  );
};

export default DeactivateForm;
