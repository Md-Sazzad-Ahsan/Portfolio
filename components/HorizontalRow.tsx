interface HorizontalRowProps{
    RowText: string;
    className?: string;
}
const HorizontalRow:React.FC<HorizontalRowProps> = ({RowText,className}) => {
  return (
    <div className={`px-5 sm:px-16 md:px-28 lg:px-56 ${className}`}> 
        <p className="text-md sm:text-lg md:text-2xl pb-1 text-cyan-600 font-semibold text-center sm:text-left">{RowText}</p>
         <hr className="pb-2 sm:pb-0" />
       </div>
  );
};

export default HorizontalRow;