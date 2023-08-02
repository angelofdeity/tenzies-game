export type DiceProps = {
    value: number,
    isHeld: boolean,
    id: string,
    handleClick: () => void
}
export default function Dice({ value, isHeld, handleClick}: DiceProps) {
    return (
        <div
            style={{ backgroundColor: isHeld ? "#59E391" : "" }}
            className="dice"
            onClick={handleClick}
        >
            {value}
        </div>
    );
}
