import  { ChangeEvent } from 'react';
import "./style.css"
function CSVUploader() {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
   
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string; 
        console.log(csvData);
      };
      reader.readAsText(file);
    }
  };


  return (
<label  htmlFor="file"  className="mb-5 w-1/3 border border-gray-400 border-dashed p-4 rounded-lg file-upload cursor-pointer">
 
    <img src="icons/upload.svg" alt="" className="m-auto mb-3" />
    Upload a CSV file with your employee details
 
  <input id="file" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
</label>
  );
}

export default CSVUploader;