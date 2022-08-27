export function BackBtn() {
  const handleClick = () => {
    window.history.back();
  };

  return <button onClick={handleClick}>back</button>;
}
