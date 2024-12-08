import { Title, Image } from "@/components/atoms";
import { Illustration, PlanCard } from "@/components/molecules";
import AUTO_APPLY_LOGO from "@/assets/images/auto-apply-logo.webp";


export default function SubscriptionModule() {
    return (
        <div className="login-layout w-full h-full relative flex flex-col items-center gap-4 pt-[230px] pb-[50px] overflow-y-scroll no-scrollbar overflow-x-hidden">
            <Illustration />
            <Image
                src={AUTO_APPLY_LOGO}
                alt=""
                width={300}
                height={300}
                className="absolute top-0 left-0 "
            />
            <Title size="h5">Choose your plan</Title>

            <div id="plans" className="w-full flex flex-col items-center gap-6 mt-[30px]">
                <PlanCard title="Basic" price={5} description="For small businesses." />
                <PlanCard title="Standard" price={7} description="For medium businesses." />
                <PlanCard title="Premium" price={10} description="For medium and large businesses." />
            </div>
        </div>
    )
}