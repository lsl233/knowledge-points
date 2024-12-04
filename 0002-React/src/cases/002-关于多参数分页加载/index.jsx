// import {useEffect, useRef, useState} from "react";

// const generateData = (query) => {
//   let index = query.pageSize * (query.page - 1)
//   return Array(query.pageSize).fill(1).map(item => {
//     index = index + 1
//     return {
//       id: index,
//       name: index
//     }
//   })
// }

// function Abc () {
//   const [data, setData] = useState([])
//   const [query, setQuery] = useState({ page: 1, pageSize: 100 })
//   const [hasMore, setHasMore] = useState(false)
//   const loadingElement = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setQuery(prev => ({...prev, page: prev.page + 1}))
//       }
//     });

//     if (loadingElement.current) {
//         observer.observe(loadingElement.current);
//     }

//     return () => {
//       if (loadingElement.current) {
//           observer.unobserve(loadingElement.current);
//       }
//     };
//   }, [])

//   useEffect(() => {
//     const timer = fetchData()
//     return () => {
//       clearTimeout(timer)
//     }
//   }, [query]);

//   // useEffect(() => {
//   //   fetchData()
//   // }, []);

//   const fetchData = () => {
//     return setTimeout(() => {
//       setData((prev) => [...prev, ...generateData(query)])
//     }, 500)
//   }

//   return (
//     <div>
//      {data.map((item, index) => <div key={index}>{item.name}</div>)}

//      <div ref={loadingElement}>Loading</div>
//     </div>
//   )
// }

// export default Abc

import React, { useState, useEffect, useRef } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreItems();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [page]);

  const loadMoreItems = () => {
    if (loading) return;
    setLoading(true);

    // 模拟异步加载数据
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + (page - 1) * 10 + 1}`);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div style={{ height: '100%', overflowY: 'auto' }}>
        {items.map((item, index) => (
          <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            {item}
          </div>
        ))}
        <div ref={loader} style={{ textAlign: 'center', padding: '10px' }}>
          {loading ? 'Loading...' : 'Scroll to load more'}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
