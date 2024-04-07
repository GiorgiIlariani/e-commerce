import DeactivateForm from "@/components/forms/profile-forms/Deactivate";

const DeactivatePage = () => {
  return (
    <section className="w-full flex flex-col">
      <h3 className="text-base font-medium mb-6">
        ანგარიშის წასაშლელად შეიყვანე მიმდინარე პაროლი
      </h3>
      <DeactivateForm />
    </section>
  );
};

export default DeactivatePage;
