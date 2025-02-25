import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const KiLanding = dynamic(() => import("@/components/KiLanding"), {
  ssr: false,
});

export default async function Page() {
  // Get Hume access token
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      <KiLanding accessToken={accessToken} />
    </div>
  );
}
