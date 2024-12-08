import { Text } from "@/components/atoms";

interface IPlanCardProps {
    title: string;
    price: number;
    description: string;
}

export default function PlanCard({ title, price, description }: IPlanCardProps) {
    return (
        <div className="plan-card relative w-[80%] flex flex-col gap-2 pt-6 pb-6 pl-4 border border-[#333333] rounded-xl cursor-pointer hover:bg-[#131313]">
            <Text size="l" className="font-bold text-white text-[18px] text-gray-900">{title}</Text>
            <Text size="xxs" className="font-console text-gray-600">{description}</Text>
            <div className="price flex flex-col mt-[10px]">
                <Text size="l" className="text-[30px] text-gray-800 font-bold">{price}$ <span className="font-bold text-gray-400">/ mo</span></Text>
            </div>
        </div>
    )
}
