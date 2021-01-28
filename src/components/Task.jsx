import checkMark from "../assets/checkMark.svg";
import goBack from "../assets/goBack.svg";

export default function Task({ index, data, onCheck }) {
  return (
    <p  >
      <div >{index}. {data.tarefa} </div>
      { data.concluida ? <hr style={{ width: '400px', position: 'absolute' }} /> : null}
      <span onClick={onCheck} >
        <img
          width="20"
          src={data.concluida ? goBack : checkMark}
          alt="select" />
      </span>
    </p>
  )
}