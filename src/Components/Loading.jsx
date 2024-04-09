import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div className="bg-zinc-200 max-w-2xl mx-auto">
        <div
            style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", 
            backgroundColor: "black",
            }}
        >
        <ClipLoader color="white" size={50} />
        </div>
    </div>
  )
}

export default Loading