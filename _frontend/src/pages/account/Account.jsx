import AccountWelcome from "./components/AccountWelcome";
import DataToolbar from "./components/DataToolbar";
import AccountTable from "./components/AccountTable";
import TableFooter from "./components/TableFooter";

function Account({ className = "" }) {

  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      <AccountWelcome />

      <div className="min-w-0  shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <DataToolbar />

        <div className="!mt-[1rem]">
          <AccountTable />
        </div>
		<TableFooter />
      </div>
    </div>

  );
}

export default Account;