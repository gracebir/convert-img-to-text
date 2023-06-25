import React, { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'



function App() {
  const [img, setImg] = useState(null)
  const [txtResult, setTxtResult] = useState("")
  const handleChange = (e) => setImg(e.target.files[0])
  const convert = async () => {
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(img);
    setTxtResult(data.text)
    await worker.terminate();
  }

  useEffect(()=> {
    convert()
  }, [img])
  return (
    <div className='min-h-screen w-full flex items-center'>
      <div className='max-w-5xl mx-auto flex flex-col gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>ImText</h1>
          <p>Gets words in image!</p>
        </div>
        <div>
          <label className="bg-gray-300 px-2 py-1 rounded-md cursor-pointer" htmlFor="upload">Upload Image</label>
          <input className='hidden' type="file" id='upload' accept='image/*' onChange={handleChange} />
        </div>
        <div className='flex gap-8'>
          {img && (
            <div className='w-80'>
              <img className='' src={URL.createObjectURL(img)} alt="img" />
            </div>
          )}
          {txtResult && (
            <div className='w-40'>
              <p>{txtResult}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default App
