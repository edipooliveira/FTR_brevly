import { LinksList } from "../components/links-list";
import { NewLinkForm } from "../components/new-link-form";
import { Logo } from "../components/ui/logo";

export function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1004px] flex-col md:max-w-[604px] lg:max-w-[1004px] gap-6 px-3 py-8 lg:gap-8 lg:py-[88px]">
      <header className="flex justify-center lg:justify-start">
        <Logo />
      </header>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-5">
        <div className="lg:w-[380px] lg:shrink-0">
          <NewLinkForm />
        </div>

        <div className="min-w-0 lg:flex-1">
          <LinksList />
        </div>
      </div>
    </main>
  );
}
