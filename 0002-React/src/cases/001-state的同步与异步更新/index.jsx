import React, { useState, useEffect } from 'react';

function PageUpdater() {
  const [page, setPage] = useState(1);

  // 同步更新
  const handleSyncUpdate = () => {
    console.log('Before sync update:', page);
    // 调用 setPage 后，page 不会立即更新
    setPage(page + 1);
    setPage(page + 1);
    setPage(page + 1);
    console.log('After sync update:', page);
  };

  // 异步更新
  const handleAsyncUpdate = () => {
    console.log('Before async update:', page);
    // 调用 setPage 后，page 也不会立即更新，但回调中 prevPage 是最新值
    setPage(prevPage => prevPage + 1);
    setPage(prevPage => prevPage + 1);
    setPage(prevPage => prevPage + 1);
    console.log('After async update:', page);
  };

  useEffect(() => {
    console.log('Page updated:', page);
  }, [page]);

  return (
    <main>
      <h1>Page: {page}</h1>
      <button onClick={handleSyncUpdate}>Sync Update</button>
      <button onClick={handleAsyncUpdate}>Async Update</button>
    </main>
  );
}

export default PageUpdater;
