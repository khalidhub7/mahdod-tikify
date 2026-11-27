import { memo } from "react";

type CmntVoteProps = {
  optionA: string;
  optionB: string;

  optionACount: number;
  optionBCount: number;
};

const CmntVote = memo(
  ({
    optionA = "💙",
    optionB = "💚",
    optionACount = 0,
    optionBCount = 0,
  }: CmntVoteProps) => (
    <div
      className={`
        bg-gray-600/5 shadow-md
        flex h-14 w-60 items-center justify-around rounded-xl
        `}
    >
      <div className="font-semibold text-white">
        {optionA} x {optionACount}
      </div>
      <div className="font-semibold text-white">
        {optionB} x {optionBCount}
      </div>
    </div>
  ),
);

export { CmntVote };
