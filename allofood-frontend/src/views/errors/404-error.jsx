import ufo from "../../assets/icons/404.svg"

const NotFound = () => {
  return (
    <div className="min-h-screen flex grow bg-slate-50 dark:bg-navy-900">
      <main className="grid w-full grow grid-cols-1 place-items-center bg-center">
        <div className="max-w-[26rem] text-center">
          <div className="w-full">
            <img className="w-full" src={ufo} alt="error icon" />
          </div>
          <p className="pt-4 text-7xl font-bold text-[#192132] dark:text-accent">
            404
          </p>
          <p className="pt-4 text-xl font-semibold text-slate-800 dark:text-navy-50">
            Oops. This Page Not Found.
          </p>
          <p className="pt-2 mb-8 text-slate-500 dark:text-navy-200">
            This page you are looking not available
          </p>

          <a
            href="/"
            className="px-4 py-3 rounded-lg h-11 bg-[#DF2020] text-base font-medium text-white hover:bg-primary-focus hover:shadow-lg hover:shadow-primary/50"
          >
            Back To Home
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;