import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../manage/products/Hooks';

const { Meta } = Card;
const General = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setData(products || []);
    };
    fetchData();
  })

  return (
    <div className='container'>
      <div className='row'>
        {
          data.map((product, index) => (
            <div className='col-md-4' key={index} style={{ marginBottom: '20px' }}>
              <Card
                hoverable
                title={product.name}
                style={{ borderRadius: '10px', overflow: 'hidden' }}
                cover={<img alt={product.name} src={product.image} style={{ height: '200px', objectFit: 'cover' }}/>}
              >
                <Meta title={`Price: $${product.price}`} description={product.description} />
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default General