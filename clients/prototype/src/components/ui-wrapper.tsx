import type { PropsWithChildren } from "react";

export const UiWrapper = ({ children }: PropsWithChildren ) =>
<div className="container w-full p-4">
    {children}
</div>