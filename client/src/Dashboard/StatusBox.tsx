export default function StatusBox(props: any) {
  return (
    <div>
      <div>{props.content}</div>
      <div>{props.date}</div>
    </div>
  );
}
