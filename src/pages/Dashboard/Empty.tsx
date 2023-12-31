import { useState } from 'react';
import './Emty.css';
import Box from '../../components/Box/Box';
import { Line, LineChart, Tooltip, XAxis, BarChart, Bar } from 'recharts';
import { ChartHoverBox } from '../../components/Charthoverbox/ChartHoverBox';

import EmTableHeads from '../../components/Em/EmTableHeads';
import EmTableRows from '../../components/Em/EmTableRows';
import { WelcomeJon, ActiveOffers } from '../../en.json';
import { format, addWeeks, addDays, addMonths} from 'date-fns';


const dataMonthly = [
  {
    name: 'Jan',
    amount: 8000,
    totalSaver: 2400,
    avgSaving: 2400,
  },
  {
    name: 'Feb',
    amount: 3000,
    totalSaver: 1398,
    avgSaving: 2210,
  },
  {
    name: 'Mar',
    amount: 2000,
    totalSaver: 9800,
    avgSaving: 2290,
  },
  {
    name: 'Apr',
    amount: 2780,
    totalSaver: 3908,
    avgSaving: 2000,
  },
  {
    name: 'May',
    amount: 1890,
    totalSaver: 4800,
    avgSaving: 2181,
  },
  {
    name: 'Jun',
    amount: 2390,
    totalSaver: 3800,
    avgSaving: 2500,
  },
];
const dataDaily = [
  {
    name: 'Mon',
    amount: 1000,
    totalSaver: 2400,
    avgSaving: 2400,
  },
  {
    name: 'Tues',
    amount: 1000,
    totalSaver: 1398,
    avgSaving: 2210,
  },
  {
    name: 'Wed',
    amount: 5000,
    totalSaver: 9800,
    avgSaving: 2290,
  },
  {
    name: 'Thrus',
    amount: 4780,
    totalSaver: 3908,
    avgSaving: 2000,
  },
  {
    name: 'Fri',
    amount: 5890,
    totalSaver: 4800,
    avgSaving: 2181,
  },
  {
    name: 'Sat',
    amount: 2390,
    totalSaver: 3800,
    avgSaving: 2500,
  },
  {
    name: 'Sun',
    amount: 10090,
    totalSaver: 3800,
    avgSaving: 2500,
  },
];




function Empty() {
  const [selectedCategory, setSelectedCategory] = useState('monthly'); //by default it should be all
    
  const [data, setData] = useState(dataMonthly); //by default it should be all
  const [status, setStatus] = useState({1:"This month",2:"Last month"});
    

  const [currentDate, setCurrentDate] = useState(new Date());
 



  let dataOfDash = [
    {
      img: 'mc.svg',
      name: "McDonald's",
      title: '20% off annual gym membership',
      exp: '06/11/2023',
      catimg: 'healthcare.svg',
      catCol: '#972144',
      cat: 'Health-care',
    },
    {
      img: 'health_fit.svg',
      name: 'Healthfit',
      title: 'Visit 2 times and save 5%',
      exp: '06/11/2023',
      catimg: 'food.svg',
      catCol: '#DA6252',
      cat: 'Food',
    },
    {
      img: 'make_my_trip.svg',
      name: 'MakeMyTrip',
      title: '50% off a 5-Day All-Inclusive Caribbean Cruise',
      exp: '06/11/2023',
      catimg: 'travel.svg',
      catCol: '#B77900',
      cat: 'Travel',
    },
    {
      img: 'starbucks.svg',
      name: 'Starbucks',
      title: 'Buy One, Get One 50% Off on Selected Fashion Items',
      exp: '06/11/2023',
      catimg: 'retail.svg',
      catCol: '#004E5F',
      cat: 'Retail',
    },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    switch (category) {
      case 'monthly':
        setCurrentDate(new Date()); // Set to current month
        setData(dataMonthly);
        setStatus({1:"This month",2:"Last month"})
        break;
      case 'weekly':
        setCurrentDate(addWeeks(new Date(), 0)); // Set to current week
        setStatus({1:"This week",2:"Last week"})
        break;
      case 'daily':
        setCurrentDate(new Date()); // Set to current date
        setData(dataDaily);
        setStatus({1:"Today",2:"Yesterday"})
        break;
      case 'alltime':
        // No need to update the date
        setStatus({1:"All time",2:"All time"})
        break;
      default:
        break;
    }
  };
  const handleNext = () => {
    switch (selectedCategory) {
      case 'monthly':
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case 'weekly':
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case 'daily':
        setCurrentDate(addDays(currentDate, 1));
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (selectedCategory) {
      case 'monthly':
        setCurrentDate(addMonths(currentDate, -1));
        break;
      case 'weekly':
        setCurrentDate(addWeeks(currentDate, -1));
        break;
      case 'daily':
        setCurrentDate(addDays(currentDate, -1));
        break;
      default:
        break;
    }
  };

  return (
    <div className="rightSide w-full h-min-screen ">
      <div className="flex items-center justify-between text-start ms-9 mt-5">
        <h1>{WelcomeJon}</h1>
      </div>
      <div className="mt-9 flex justify-between mb-5 items-center ">
        <div className="w-2/12"></div>
          <div className="" id="main">
           
            {selectedCategory !== 'alltime' && (
              <div className='flex justify-center items-center gap-5' >
                <div dir="rtl">
                  <button
                
                    className="border-2 border-solid rounded-lg p-2 "
                    onClick={handlePrevious}
                  >
                    <img src="icons/chevron_left.svg" alt="Previous" />
                  </button>
                </div>

                <h4 id="change">
                  {
                    selectedCategory === 'monthly'
                      ? format(currentDate, 'MMMM yyyy')
                      : selectedCategory === 'weekly'
                      ? `Week ${format(currentDate, 'w')}, ${format(currentDate, 'yyyy')}`
                      : selectedCategory === 'daily'
                      ? format(currentDate, 'MMMM d, yyyy')
                      : null /* Null to hide the date display when 'All time' is selected */
                  }
                </h4>

                <div dir="ltr">
                  <button
                   
                    className="border-2 border-solid rounded-lg p-2 "
                    onClick={handleNext}
                  >
                    <img src="icons/chevron_right.svg" alt="Next" />
                  </button>
                </div>
              </div>
            )}
          </div>


          <ul className="flex justify-end ">
            <li
              className={`${
                selectedCategory === 'monthly' ? 'active' : ''
              } list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('monthly')}
            >
              <a>Monthly</a>
            </li>
            <li
              className={`${
                selectedCategory === 'weekly' ? 'active' : ''
              } list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('weekly')}
            >
              <a>Weekly</a>
            </li>
            <li
              className={`${selectedCategory === 'daily' ? 'active' : ''} list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('daily')}
            >
              <a>Daily</a>
            </li>
            <li
              className={`${
                selectedCategory === 'alltime' ? 'active' : ''
              } list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('alltime')}
            >
              <a>All time</a>
            </li>
          </ul>
        </div>
      <div className="mt-5 ms-5 grid grid-cols-2 gap-4">
        <Box
          title="Employee contribution"
          img="gift.svg"
          h4={status}
          valueT="$1,520"
          valueL="$1,520"
          avg="contribution"
          h6="Receivers"
    
          chart={
            <BarChart width={800} height={250} data={data}>
              <Bar dataKey="amount" fill="rgb(56 133 123 /1)" radius={[10, 10, 0, 0]} />
              <Tooltip
                content={<ChartHoverBox active={undefined} payload={undefined} label={undefined} />}
                cursor={{ fill: 'transparent' }}
              />
               <XAxis dataKey="name" /> 
            </BarChart>
          }
        />
        <Box
          title="Total amount saved"
          img="amt_saved.svg"
          valueT="$1,520"
          valueL="$1,520"
          avg="savings"
          h6="Total no of savers"
          h4={status}
          chart={
            <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip
                content={<ChartHoverBox active={undefined} payload={undefined} label={undefined} />}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="rgb(56 133 123 /1)"
                strokeWidth={3}
                dot={{ stroke: 'tomato', strokeWidth: '2', fill: 'white', r: 6 }}
              />
            </LineChart>
          }
        />
        <Box
          title="Total round-ups value"
          img="arrow_up.svg"
          valueT="$1,520"
          valueL="$1,520"
          avg="round-ups"
          h6="Total no of transection"
          h4={status}
          chart={
            <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip
                content={<ChartHoverBox active={undefined} payload={undefined} label={undefined} />}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="rgb(56 133 123 /1)"
                strokeWidth={3}
                dot={{ stroke: 'tomato', strokeWidth: '2', fill: 'white', r: 6 }}
              />
            </LineChart>
          }
        />
        <Box
          title="Total cash-back value"
          img="cash_back.svg"
          valueT="$1,520"
          valueL="$1,520"
          avg="cash-back"
          h6="Total no of transection"
          h4={status}
          chart={
            <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip
                content={<ChartHoverBox active={undefined} payload={undefined} label={undefined} />}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="rgb(56 133 123 /1)"
                strokeWidth={3}
                dot={{ stroke: 'tomato', strokeWidth: '2', fill: 'white', r: 6 }}
              />
            </LineChart>
          }
        />
      </div>
      <div className="items-center justify-between text-start ms-9 mt-5">
        {/* ... your active offers section ... */}
        <h4 className="text-start">{ActiveOffers}</h4>
        {/* <div className='text-center my-12'>
                        <p style={{ color: 'grey'}}>There is no active offers at this time</p>
                    </div> */}
        <div className="">
          <div className="mt-4">
            <table className="table-auto w-full">
              <EmTableHeads hkey="Dash" />
              {dataOfDash.map((item, index) => (
                <EmTableRows
                  rkey="Dash"
                  key={index}
                  img={item.img}
                  name={item.name}
                  title={item.title}
                  catimg={item.catimg}
                  catCol={item.catCol}
                  cat={item.cat}
                  exp={item.exp}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Empty;
