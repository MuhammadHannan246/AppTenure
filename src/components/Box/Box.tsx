// import { BarChart } from '@mui/x-charts/BarChart';

export default function Box(props: any) {
  return (
    <div className="mt-5 mx-5 relative border rounded-lg border-solid" style={{ color: 'rgb(28, 92, 95)' }}>
      <div className=" rounded-lg w-full p-4 pb-0">
        <div className="flex justify-start items-start h-full">
          <img src={`icons/${props.img}`} className="mr-2" alt="" />
          <h1>{props.title}</h1>
        </div>
        <div className="flex justify-between my-10">
          <div className="justify-start text-start">
            <h4>{props.h4[2]}   </h4>
            <h1 className="text-5xl my-4">{props.valueT}</h1>
            <h6 className="text-start my-2">{props.h6}: 8</h6>
            <h6>Average {props.avg}: $150.20</h6>
          </div>
          <div className="justify-end text-start " style={{ color: '#5A7894' }}>
            <h4>{props.h4[1]}</h4>
            <h1 className="text-5xl my-4">{props.valueL}</h1>
            <h6 className=" my-2">{props.h6}: 8</h6>
            <h6>Average {props.avg}: $150.20</h6>
          </div>
        </div>
       { props.h4[1] != "All time"
 ?        <div className="mt-7 w-fit m-auto">
          Last 6 months
          {props.chart}
    
        </div>
  :null

       }</div>
    </div>
  );
}
