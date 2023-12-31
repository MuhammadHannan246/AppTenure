import React, { useEffect, useState } from 'react';
import EmTableHeads from '../../components/Em/EmTableHeads';
import EmTableRows from '../../components/Em/EmTableRows';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { styled, Box, Theme } from '@mui/system';
import { TextField } from '@mui/material';
import { Modal } from '@mui/base/Modal';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { format, addWeeks, addDays, addMonths, startOfWeek, endOfWeek, parse } from 'date-fns';
import axios from 'axios';
import { utcToZonedTime } from 'date-fns-tz';

type dataFormat = {
  id: number;
  'Date & Time': string; // Date & Time is a string in your data
  'Amount': string; // Amount is also a string in your data
  'Payment channel': string;
  'Transaction Type': string;
};

export default function Wallet() {
  const navigate = useNavigate(); // Initialize the navigate function
  const navigateToEditCard = () => {
    navigate('/Edit'); // Replace '/cat-details' with the actual path to your CatDetails page
  };

  // edit reward budget
  const [open2, setOpen2] = useState(false);
  const sendANotOp = () => setOpen2(true);
  const sendANotCl = () => setOpen2(false);

  const [openR, setOpenR] = useState(false);
  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  const formik = useFormik({
    initialValues: {
      budget: '',
    },
    validationSchema: yup.object().shape({
      budget: yup.string().required('This field is required'),
    }),
    onSubmit: () => {
      sendANotCl();
    },
  });

  const [selectedCategory, setSelectedCategory] = useState('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState<dataFormat[]>([]);

  const filterData = async () => {
    try {
      const data = await axios.get('/src/assets/wallet.json');
      const jsonData = await data.data;

      const filtered = jsonData.filter((item: { [x: string]: any }) => {
        const timeZone = 'Asia/Karachi';
        const itemDate = parse(item['Date & Time'], "MM/dd/yy, h:mma 'EST'", new Date());
        const zonedItemDate = utcToZonedTime(itemDate, timeZone); // Convert to PKT
        console.log(zonedItemDate.getMonth() === currentDate.getMonth());
        console.log('Item Date String:', item['Date & Time']);
        console.log('Parsed Item Date:', zonedItemDate);

        switch (selectedCategory) {
          case 'monthly':
            return (
              zonedItemDate.getMonth() === currentDate.getMonth() &&
              zonedItemDate.getFullYear() === currentDate.getFullYear()
            );
          case 'weekly':
            const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
            return zonedItemDate >= weekStart && zonedItemDate <= weekEnd;
          case 'daily':
            return (
              zonedItemDate.getDate() === currentDate.getDate() &&
              zonedItemDate.getMonth() === currentDate.getMonth() &&
              zonedItemDate.getFullYear() === currentDate.getFullYear()
            );
          default:
            return true;
        }
      });
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    filterData();
  }, [selectedCategory, currentDate]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    switch (category) {
      case 'monthly':
        setCurrentDate(new Date()); // Set to current month
        break;
      case 'weekly':
        setCurrentDate(addWeeks(new Date(), 0)); // Set to current week
        break;
      case 'daily':
        setCurrentDate(new Date()); // Set to current date
        break;
      case 'alltime':
        // No need to update the date
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
    <div className="w-full ">
      <div className="flex items-center justify-between text-start ms-4 mt-5">
        <h1>Wallet</h1>
      </div>
      <div className="flex">
        <div
          className="mt-5 mx-5  w-1/2 relative border rounded-lg border-solid p-4"
          style={{ color: 'rgb(28, 92, 95)' }}
        >
          <div className="rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex">
                <img src={`icons/wallet_1.svg`} className="mr-2" alt="" />
                <h1>Wallet</h1>
              </div>
              <div className="flex cursor-pointer">
                <img src="icons/edit.svg" className="mr-2" alt="" />
                <span onClick={sendANotOp}>Edit Rewards Budget</span>
                {/* edit reward budget */}
                <StyledModal
                  aria-labelledby="unstyled-modal-title"
                  aria-describedby="unstyled-modal-description"
                  open={open2}
                  slots={{ backdrop: StyledBackdrop }}
                >
                  <Box sx={style2}>
                    <div className="flex justify-end">
                      <img src="icons/cross69.svg" className="cursor-pointer" onClick={sendANotCl} alt="" />
                    </div>
                    <h3 className="text-center mt-6" style={{ color: '#25384D', fontWeight: '700' }}>
                      Edit Reward Budget
                    </h3>
                    <form className="my-2" onSubmit={formik.handleSubmit}>
                      <TextField
                        name="budget"
                        value={formik.values.budget}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ border: formik.touched.budget && formik.errors.budget ? '1px solid red' : '' }}
                        type="text"
                        label="$ Current budget"
                        sx={{ width: 1, marginY: 1 }}
                      />
                      {formik.touched.budget && formik.errors.budget ? (
                        <div className="text-start  mb-4 peer-invalid:visible text-danger-500 text-sm">
                          {formik.errors.budget}
                        </div>
                      ) : null}
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          className="p-2 rounded-md cursor-pointer"
                          style={{ backgroundColor: '#38857B', color: 'white', fontWeight: '600' }}
                        >
                          Send
                        </button>
                        <button
                          onClick={sendANotCl}
                          className="mx-3 p-2 rounded-md cursor-pointer"
                          style={{ border: '1px solid #38857B', color: '#38857B', fontWeight: '600' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Box>
                </StyledModal>
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <div className="flex flex-col text-start">
                <h1 className="text-base my-1">Available balance</h1>
                <h1 className="text-5xl">$3,000</h1>
              </div>
              <div className="flex flex-col text-start" style={{ color: '#5A7894' }}>
                <h1 className="text-base my-1">Reward Budget</h1>
                <h1 className="text-5xl">$3,000</h1>
              </div>
            </div>
            <div className="flex justify-center pt-40">
              <button
                onClick={() => navigate('/TopUp')}
                className="flex rounded-lg p-2"
                style={{ backgroundColor: '#38857b', color: 'white' }}
              >
                <img src="icons/add_2.svg" className="mr-2" alt="" />
                Top up Wallet
              </button>
            </div>
          </div>
        </div>
        <div
          className="mt-5 mx-5  w-1/2 relative border rounded-lg border-solid p-4"
          style={{ color: 'rgb(28, 92, 95)' }}
        >
          <div className="rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex">
                <img src={`icons/cards_2.svg`} className="mr-2 w-10" alt="" />
                <h1>Link cards</h1>
              </div>
              <div className="flex cursor-pointer" onClick={() => navigate('/AddCard')}>
                <img src="icons/add_1.svg" className="mr-2" alt="" />
                <span>Add Another Card</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className="flex justify-between border mx-3 rounded-lg p-2 my-3">
              <div className="flex">
                <img src="icons/mastercard.svg" className="mr-3 w-10" alt="" />
                <div className="flex flex-col">
                  <h5 className="text-lg font-bold text-start">1234****1280</h5>
                  <p className="text-start">Expires 6/24</p>
                </div>
              </div>
              <div className="flex p-2">
                <Tippy content={<span>Edit this card</span>} placement="bottom" animation="scale">
                  <a
                    onClick={navigateToEditCard}
                    className="rounded me-3 button cursor-pointer px-3 py-3"
                    style={{ backgroundColor: 'rgba(28, 92, 95, 1)' }}
                  >
                    <img src="icons/edit.svg" style={{ filter: 'brightness(900%)' }} alt="" />
                  </a>
                </Tippy>
                <Tippy content={<span>Remove this card</span>} placement="bottom" animation="scale">
                  <a
                    onClick={handleOpenR}
                    style={{ border: '1px solid rgb(210, 66, 82)' }}
                    className="cross px-3 py-3 rounded hover:bg-red-100 cursor-pointer"
                  >
                    <img src="icons/close.svg" alt="" />
                  </a>
                </Tippy>
                <StyledModal
                  aria-labelledby="unstyled-modal-title"
                  aria-describedby="unstyled-modal-description"
                  open={openR}
                  onClose={handleCloseR}
                  slots={{ backdrop: StyledBackdrop }}
                >
                  <Box sx={style2}>
                    <div className="py-4">
                      <div className="flex justify-end">
                        <img
                          src="icons/cross69.svg"
                          onClick={handleCloseR}
                          className="cursor-pointer"
                          alt=""
                        />
                      </div>
                      <p className="text-center mt-6 mb-2" style={{ color: '#25384D' }}>
                        Are you sure you want to delete this card?
                      </p>
                      <div className="flex place-content-center mt-4">
                        <button
                          onClick={handleCloseR}
                          className="p-2 rounded-md"
                          style={{ border: '1px solid #D24252', color: '#D24252', fontWeight: '600' }}
                        >
                          Yes, remove
                        </button>
                        <button
                          onClick={handleCloseR}
                          className="mx-2 rounded-md p-2"
                          style={{ backgroundColor: '#38857B', color: '#FFFFFF', fontWeight: '600' }}
                        >
                          No, don’t remove
                        </button>
                      </div>
                    </div>
                  </Box>
                </StyledModal>
              </div>
            </div>
            <div className="flex justify-between border mx-3 rounded-lg p-2 my-3">
              <div className="flex">
                <img src="icons/visa.svg" className="mr-3 w-10" alt="" />
                <div className="flex flex-col">
                  <h5 className="text-lg font-bold text-start">1234****1280</h5>
                  <p className="text-start">Expires 6/24</p>
                </div>
              </div>
              <div className="flex p-2">
                <Tippy content={<span>Edit</span>} placement="bottom" animation="scale">
                  <a
                    onClick={navigateToEditCard}
                    className="rounded me-3 button cursor-pointer px-3 py-3"
                    style={{ backgroundColor: 'rgba(28, 92, 95, 1)' }}
                  >
                    <img src="icons/edit.svg" style={{ filter: 'brightness(900%)' }} alt="" />
                  </a>
                </Tippy>
                <Tippy content={<span>Remove</span>} placement="bottom" animation="scale">
                  <a
                    style={{ border: '1px solid rgb(210, 66, 82)' }}
                    className="cross px-3 py-3 rounded hover:bg-red-100 cursor-pointer"
                  >
                    <img src="icons/close.svg" alt="" />
                  </a>
                </Tippy>
              </div>
            </div>
            <div className="flex justify-between border mx-3 rounded-lg p-2 my-3">
              <div className="flex">
                <img src="icons/mastercard.svg" className="mr-3 w-10" alt="" />
                <div className="flex flex-col">
                  <h5 className="text-lg font-bold text-start">1234****1280</h5>
                  <p className="text-start">Expires 6/24</p>
                </div>
              </div>
              <div className="flex p-2">
                <Tippy content={<span>Edit</span>} placement="bottom" animation="scale">
                  <a
                    onClick={navigateToEditCard}
                    className="rounded me-3 button cursor-pointer px-3 py-3"
                    style={{ backgroundColor: 'rgba(28, 92, 95, 1)' }}
                  >
                    <img src="icons/edit.svg" style={{ filter: 'brightness(900%)' }} alt="" />
                  </a>
                </Tippy>
                <Tippy content={<span>Remove</span>} placement="bottom" animation="scale">
                  <a
                    style={{ border: '1px solid rgb(210, 66, 82)' }}
                    className="cross px-3 py-3 rounded hover:bg-red-100 cursor-pointer"
                  >
                    <img src="icons/close.svg" alt="" />
                  </a>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 px-10">
        <div className="text-start">
          <h1>Transaction History</h1>
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
              className={`${selectedCategory === 'monthly' ? 'active' : ''
                } list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('monthly')}
            >
              <a>Monthly</a>
            </li>
            <li
              className={`${selectedCategory === 'weekly' ? 'active' : ''
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
              className={`${selectedCategory === 'alltime' ? 'active' : ''
                } list-none rounded-lg p-2 cursor-pointer mx-2`}
              onClick={() => handleCategoryChange('alltime')}
            >
              <a>All time</a>
            </li>
          </ul>
        </div>
      </div>
      <table className="m-auto" style={{ width: '96%' }}>
        <EmTableHeads hkey="Wall" />
        {filteredData.map((item) => (
          <EmTableRows
            key={item['id']} // Make sure to use a unique key
            rkey="Wall"
            date={item['Date & Time']}
            amt={item.Amount}
            channel={item['Payment channel']}
            type={item['Transaction Type']}
          />
        ))}
      </table>

      {
        // ( <div>
        //   {(function () {
        //     if (selectedCategory === 'monthly') {
        //       return <div className="px-6">
        //         <h4 className='text-start text-xl mb-3'>Monthly</h4>
        //         <table className="table-auto w-full px-4">
        //           <thead>
        //             <tr className="bg-white-600 shadow-lg my-4">
        //               <th className="text-start w-1/4 p-4" style={{ color: 'rgb(37, 56, 77);' }}>Date & Time</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Amount</th>
        //               <th className="text-start w-1/5" style={{ color: 'rgb(37, 56, 77);' }}>Payment channel</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Transaction Type</th>
        //             </tr>
        //           </thead>
        //           <tbody className="gap-x-7 gap-y-7">
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">January</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>20000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">February</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>30000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">March</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>40000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">April</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>50000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">May</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>60000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">June</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>70000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //           </tbody>
        //         </table>
        //       </div>
        //     } else if (selectedCategory === 'weekly') {
        //       return <div className="px-6">
        //         <h4 className='text-start text-xl mb-3'>Weekly</h4>
        //         <table className="table-auto w-full px-4">
        //           <thead>
        //             <tr className="bg-white-600 shadow-lg my-4">
        //               <th className="text-start w-1/4 p-4" style={{ color: 'rgb(37, 56, 77);' }}>Date & Time</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Amount</th>
        //               <th className="text-start w-1/5" style={{ color: 'rgb(37, 56, 77);' }}>Payment channel</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Transaction Type</th>
        //             </tr>
        //           </thead>
        //           <tbody className="gap-x-7 gap-y-7">
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Week 1</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>506700</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Week 2</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>65500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Week 3</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>85500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Week 4</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>45500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Week 5</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>75500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //           </tbody>
        //         </table>
        //       </div>
        //     } else if (selectedCategory === 'daily') {
        //       return <div className="px-6">
        //         <h4 className='text-start text-xl mb-3'>Daily</h4>
        //         <table className="table-auto w-full px-4">
        //           <thead>
        //             <tr className="bg-white-600 shadow-lg my-4">
        //               <th className="text-start w-1/4 p-4" style={{ color: 'rgb(37, 56, 77);' }}>Date & Time</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Amount</th>
        //               <th className="text-start w-1/5" style={{ color: 'rgb(37, 56, 77);' }}>Payment channel</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Transaction Type</th>
        //             </tr>
        //           </thead>
        //           <tbody className="gap-x-7 gap-y-7">
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Monday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>60200</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Tuesday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>506500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Wednesday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>406500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Thursday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>606500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Friday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>706500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Saturday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>906500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">Sunday</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>106500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //           </tbody>
        //         </table>
        //       </div>
        //     } else if (selectedCategory === 'alltime') {
        //       return <div className="px-6">
        //         <h4 className='text-start text-xl mb-3'>All Time</h4>
        //         <table className="table-auto w-full px-4">
        //           <thead>
        //             <tr className="bg-white-600 shadow-lg my-4">
        //               <th className="text-start w-1/4 p-4" style={{ color: 'rgb(37, 56, 77);' }}>Date & Time</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Amount</th>
        //               <th className="text-start w-1/5" style={{ color: 'rgb(37, 56, 77);' }}>Payment channel</th>
        //               <th className="text-start" style={{ color: 'rgb(37, 56, 77);' }}>Transaction Type</th>
        //             </tr>
        //           </thead>
        //           <tbody className="gap-x-7 gap-y-7">
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">16/11/2023</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>405500</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">18/11/2023</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>444000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">19/11/2023</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>544000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">20/11/2023</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>7744000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>
        //             <tr className="bg-white-600 shadow-lg rounded-xl mt-4 transition-colors hover:bg-yellow-500">
        //               <td className="flex p-4 w-1/4">
        //                 <h5 className="text-start pt-1">21/11/2023</h5>
        //               </td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>844000</td>
        //               <td className="text-md text-start w-1/4" style={{ color: 'rgb(37, 56, 77);' }}>Tenure</td>
        //               <td className="flex text-start w-1/4">
        //                 <p >Bank</p>
        //               </td>
        //             </tr>

        //           </tbody>
        //         </table>
        //       </div>
        //     }
        //     else {
        //       return <span>Neither</span>
        //     }
        //   }).call(selectedCategory)}
        // </div>)
      }

    </div>
  );
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style2 = (theme: Theme) => ({
  width: 500,
  borderRadius: '12px',
  padding: '16px 32px 24px 32px',
  backgroundColor: 'white',
  color: 'black',
  boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
});
