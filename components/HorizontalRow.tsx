interface HorizontalRowProps{
    RowText: string;
}
const HorizontalRow:React.FC<HorizontalRowProps> = ({RowText}) => {
  return (
    <div className="px-5 sm:px-16 md:px-28 lg:px-56"> 
        <p className="text-md sm:text-lg md:text-2xl lg:text-3xl pb-1 text-cyan-500">{RowText}</p>
         <hr />
       </div>
  );
};

export default HorizontalRow;