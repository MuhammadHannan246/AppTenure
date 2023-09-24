import Empty from '../../pages/Dashboard/Empty';
import Employees from '../../pages/Employees/Employees';
import Deals from '../../pages/Deals/Deals';
import Wallet from '../../pages/Wallet/Wallet';
import Settings from '../../pages/Settings/Settings';
import Slidebar from '../Slidebar/Slidebar';
import {useState} from "react"
// import Reciever from '../../pages/Employees/Reciever/Reciever.tsx';
// import Purchase from '.././pages/Employees/Purchase/Purchase.tsx';
// import Purchase from '../../pages/Employees/Purchase/Purchase.tsx';
import { Route, Routes } from 'react-router-dom';
import CatDetails from '../CatDetails/CatDetails';
import CreateANewDeal from '../../pages/Deals/CreateANewDeal/CreateANewDeal';
import Edit from '../../pages/Wallet/Edit/Edit';
import TopUp from '../../pages/Wallet/TopUp/TopUp';
import './Layout.css';
export default function Layout() {
const [item, setItem] = useState({});
  const EmployeeDealData = [
    {
      img: 'health_fit.svg',
      catimg: 'healthcare.svg',
      catcol: '#972144',
      id: 1,
      brand: 'Health Fit',
      offerTitle: '20% off annual gym memberships',
      expirydate: '6/11/2023',
      category: 'Health-care',
    },
    {
      img: 'gap.svg',
      catimg: 'retail.svg',
      catcol: '#004E5F',
      id: 2,
      brand: 'Gap',
      offerTitle: 'Buy one, get one 50% off on selected fashion items',
      expirydate: '8/30/2023',
      category: 'Retail',
    },
    {
      img: 'starbucks.svg',
      catimg: 'food.svg',
      catcol: '#DA6252',
      id: 3,
      brand: 'Starbucks',
      offerTitle: 'Visit two times and save 5%',
      expirydate: '9/5/2023',
      category: 'Food',
    },
    {
      img: 'make_my_trip.svg',
      catimg: 'travel.svg',
      catcol: '#B77900',
      id: 4,
      brand: 'MakeMytrip',
      offerTitle: '50% off a 5-day All-inclusive Caribbean cruise',
      expirydate: '11/10/2023',
      category: 'Travel',
    },
    {
      img: 'health_fit.svg',
      catimg: 'healthcare.svg',
      catcol: '#972144',
      id: 5,
      brand: 'Health Fit',
      offerTitle: '10% off personal training sessions',
      expirydate: '7/15/2023',
      category: 'Health-care',
    },
    {
      img: 'gap.svg',
      catimg: 'retail.svg',
      catcol: '#004E5F',
      id: 6,
      brand: 'Gap',
      offerTitle: 'Free shipping on all orders',
      expirydate: '8/25/2023',
      category: 'Retail',
    },
    {
      img: 'starbucks.svg',
      catimg: 'food.svg',
      catcol: '#DA6252',
      id: 7,
      brand: 'Starbucks',
      offerTitle: 'Buy one, get one free on espresso drinks',
      expirydate: '9/10/2023',
      category: 'Food',
    },
    {
      img: 'make_my_trip.svg',
      catimg: 'travel.svg',
      catcol: '#B77900',
      id: 8,
      brand: 'MakeMytrip',
      offerTitle: '25% off a luxury beachfront resort stay',
      expirydate: '11/5/2023',
      category: 'Travel',
    },
  ];
  const EmployerDealData = [
    {
      img: 'health_fit.svg',
      catimg: 'healthcare.svg',
      catcol: '#972144',
      id: 1,
      brand: 'Health Fit',
      offerTitle: '20% off annual gym memberships',
      expirydate: '6/11/2023',
      category: 'Health-care',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 2,
      brand: 'The Apple Factory',
      offerTitle: 'Buy one, get one 50% off on all products',
      expirydate: '6/11/2023',
      category: 'Local Business',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 3,
      brand: 'S.U.C.C.E.S.S',
      offerTitle: 'Forge the future through donation',
      expirydate: '6/11/2023',
      category: 'Community partnership',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 4,
      brand: 'SuccessCoaching',
      offerTitle: 'Accelerate professional growth through 10 free courses',
      expirydate: '6/11/2023',
      category: 'Professional Development',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 5,
      brand: 'Gadgets plus',
      offerTitle: 'Get 50% off all apple products',
      expirydate: '6/11/2023',
      category: 'Gadgets',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 6,
      brand: 'KPMG',
      offerTitle: 'Free Business Auditing',
      expirydate: '6/11/2023',
      category: 'Financial Services',
    },
    {
      img: 'make_my_trip.svg',
      catimg: 'travel.svg',
      catcol: '#B77900',
      id: 7,
      brand: 'MakeMytrip',
      offerTitle: '50% off a 5-day All-inclusive Caribbean cruise',
      expirydate: '11/10/2023',
      category: 'Travel',
    },
    {
      img: 'health_fit.svg',
      catimg: 'healthcare.svg',
      catcol: '#972144',
      id: 8,
      brand: 'Health Fit',
      offerTitle: '20% off annual gym memberships',
      expirydate: '6/11/2023',
      category: 'Health-care',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 9,
      brand: 'The Apple Factory',
      offerTitle: 'Buy one, get one 50% off on all products',
      expirydate: '6/11/2023',
      category: 'Local Business',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 10,
      brand: 'S.U.C.C.E.S.S',
      offerTitle: 'Forge the future through donation',
      expirydate: '6/11/2023',
      category: 'Community partnership',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 11,
      brand: 'SuccessCoaching',
      offerTitle: 'Accelerate professional growth through 10 free courses',
      expirydate: '6/11/2023',
      category: 'Professional Development',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 12,
      brand: 'Gadgets plus',
      offerTitle: 'Get 50% off all apple products',
      expirydate: '6/11/2023',
      category: 'Gadgets',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 13,
      brand: 'KPMG',
      offerTitle: 'Free Business Auditing',
      expirydate: '6/11/2023',
      category: 'Financial Services',
    },
    {
      img: 'make_my_trip.svg',
      catimg: 'travel.svg',
      catcol: '#B77900',
      id: 14,
      brand: 'MakeMytrip',
      offerTitle: '50% off a 5-day All-inclusive Caribbean cruise',
      expirydate: '11/10/2023',
      category: 'Travel',
    },
    {
      img: 'health_fit.svg',
      catimg: 'healthcare.svg',
      catcol: '#972144',
      id: 15,
      brand: 'Health Fit',
      offerTitle: '20% off annual gym memberships',
      expirydate: '6/11/2023',
      category: 'Health-care',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 16,
      brand: 'The Apple Factory',
      offerTitle: 'Buy one, get one 50% off on all products',
      expirydate: '6/11/2023',
      category: 'Local Business',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 17,
      brand: 'S.U.C.C.E.S.S',
      offerTitle: 'Forge the future through donation',
      expirydate: '6/11/2023',
      category: 'Community partnership',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 18,
      brand: 'SuccessCoaching',
      offerTitle: 'Accelerate professional growth through 10 free courses',
      expirydate: '6/11/2023',
      category: 'Professional Development',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 19,
      brand: 'Gadgets plus',
      offerTitle: 'Get 50% off all apple products',
      expirydate: '6/11/2023',
      category: 'Gadgets',
    },
    {
      img: '',
      catimg: '',
      catcol: '',
      id: 20,
      brand: 'KPMG',
      offerTitle: 'Free Business Auditing',
      expirydate: '6/11/2023',
      category: 'Financial Services',
    },
    {
      img: 'make_my_trip.svg',
      catimg: 'travel.svg',
      catcol: '#B77900',
      id: 21,
      brand: 'MakeMytrip',
      offerTitle: '50% off a 5-day All-inclusive Caribbean cruise',
      expirydate: '11/10/2023',
      category: 'Travel',
    },
  ];
  return (
    <div className='wholePage'>
      <div className="left">
        <Slidebar />
      </div>
      <div className='right'>
        <Routes>
          {/* Remove the nested Routes component from here */}
          <Route path="/Dashboard" element={<Empty />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Deals" element={<Deals Data={{1:EmployeeDealData,2:EmployerDealData }} setItem={setItem}/>} />
          <Route path="/Wallet" element={<Wallet />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/CatDetails" element={<CatDetails item={item}/>} />
          <Route path="/CreateANewDeal" element={<CreateANewDeal headingText={'Create a new deal'} />} />
          <Route path="/EditDeal" element={<CreateANewDeal headingText={'Edit Deal'}/>} />
          <Route path="/Edit" element={<Edit headingText='Edit card details'/>} />
          <Route path="/AddCard" element={<Edit headingText='Add a new Card'/>} />
          <Route path="/TopUp" element={<TopUp />} />
        </Routes>
      </div>
    </div>
  );
}
