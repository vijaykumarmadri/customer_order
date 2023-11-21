import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { BarChart, Bar,  XAxis, YAxis,ResponsiveContainer } from 'recharts';



const Container = styled.div`
  background-color: #030303;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const AdminDashboard = ({ token, userId }) => {
  const [data, setData] = useState(null);
  const [customAmount, setCustomAmount] = useState(0);
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: 0,
    category_8: 0,
    category_9: 0,
    category_10: 0,
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`https://stg.dhunjam.in/account/admin/${userId}`);

        if (response.data.status === 200) {
          setData(response.data.data);
          setCustomAmount(response.data.data.amount.category_6);
          setRegularAmounts({
            category_7: response.data.data.amount.category_7,
            category_8: response.data.data.amount.category_8,
            category_9: response.data.data.amount.category_9,
            category_10: response.data.data.amount.category_10,
          });
        } else {
          console.error('Failed to fetch admin details');
        }
        
        
      } catch (error) {
        console.error('Error during API call:', error);
      }
    };

    if (token && userId) {
      fetchAdminDetails();
    }
  }, [token, userId]);

  // if(customAmount<99){
  //   const input ={
  //     disabled:"true",
  //   }
  // }

  const handleCustomAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setCustomAmount(amount);
    
  };

  const handleRegularAmountChange = (e, category) => {
    const amount = parseInt(e.target.value, 10);
    setRegularAmounts((prevAmounts) => ({ ...prevAmounts, [category]: amount }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://stg.dhunjam.in/account/admin/${userId}`,
        {
          amount: {
            category_6: customAmount,
            category_7: regularAmounts.category_7,
            category_8: regularAmounts.category_8,
            category_9: regularAmounts.category_9,
            category_10: regularAmounts.category_10,
          },
        }
      );
      

      if (response.data.status === 200) {
        console.log('Prices updated successfully');
      } else {
        console.error('Failed to update prices');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  }; 
// chart data

const datachart =  [
  
  {
    name: 'custom',
    value: customAmount,
  },
  {
    name: 'Category 1',
    value: regularAmounts.category_7,
  },
  {
    name: 'Category 2',
    value: regularAmounts.category_8,
  },
  {
    name: 'Category 3',
    value: regularAmounts.category_9,
  },
  {
    name: 'Category 4',
    value: regularAmounts.category_10,
  },
];

  
  ;

  return (
    <Container className='d-grid justify-content-center align-items-center'>
      {data ? (
        <>
          <h1>{data.name}</h1>
          <p>Location: {data.location}</p>

          <label >
            Do you want to charge your <br/>customers for requesting songs? 
            YES<input type="radio" checked={data.charge_customers} readOnly className='radio ml-5' />
            NO<input type="radio"  className='radio'style={{background:"white"}} value="flase"/>

          </label>


          {data.charge_customers && (
            <>
              <label>
                Custom song request amount:
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  disabled={data.charge_customers===false}
                />
                
              </label>

              <label className='d-flex gap-2'>
                Regular song request amount,<br/>from high to low
                <input
                  type="number"
                  value={regularAmounts.category_7}
                  onChange={(e) => handleRegularAmountChange(e, 'category_7')}
                  disabled={customAmount<99}
                  className='input'
                />
                <input
                  type="number"
                  value={regularAmounts.category_8}
                  onChange={(e) => handleRegularAmountChange(e, 'category_8')}
                  disabled={customAmount<99}
                  className='input'
                />
                <input
                  type="number"
                  value={regularAmounts.category_9}
                  onChange={(e) => handleRegularAmountChange(e, 'category_9')}
                  disabled={customAmount<99}
                  className='input'
                />
                                <input
                  type="number"
                  value={regularAmounts.category_10}
                  onChange={(e) => handleRegularAmountChange(e, 'category_10')}
                  disabled={customAmount<99}
                  className='input'
                />
                
              </label><br/><br/>

              {/* barchart */}

              <ResponsiveContainer width="100%" height="100%" minwidth={30} minHeight={250}>
        <BarChart 
        barGap={1}
          width={200}
          height={300}
          data={datachart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="pink"  barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
                <button onClick={handleSave} 
                disabled={customAmount<99||
                  regularAmounts.category_7<79||
                  regularAmounts.category_8<59||
                  regularAmounts.category_9<39||
                  regularAmounts.category_10<19}
                
                className='button'>Save</button>
              
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default AdminDashboard;
