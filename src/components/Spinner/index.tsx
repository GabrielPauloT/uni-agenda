import { Icons } from "../Icons";

export function Spinner() {
  return (
    <div className="border-primary-100 flex h-16 w-16 animate-spin items-center justify-center rounded-full border-b-8 border-t-8">
      <Icons name="BsDatabaseExclamation" />
    </div>
  );
}
