import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
        backgroundColor: "black"
        }}
    >
    <ClipLoader color={white} size={50} />
    </div>
  )
}

export default Loading