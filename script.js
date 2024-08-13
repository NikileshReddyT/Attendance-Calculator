function calculateAttendance() {
  const desiredPercentage = parseFloat(
    document.getElementById("desiredPercentage").value
  );
  const conductedClasses = document
    .getElementById("conductedClasses")
    .value.split(" ")
    .map(Number);
  const attendedClasses = document
    .getElementById("attendedClasses")
    .value.split(" ")
    .map(Number);

  const totalConducted = conductedClasses.reduce((acc, cur) => acc + cur, 0);
  const totalAttended = attendedClasses.reduce((acc, cur) => acc + cur, 0);

  if (totalAttended > totalConducted) {
    document.getElementById("result").innerText =
      "Don't lie... please check the details properly";
    return;
  }

  let presentPercentage = parseFloat(
    ((totalAttended / totalConducted) * 100).toFixed(2)
  );
  let initialPercentage = presentPercentage;
  let x = 0;
  let y = 0;

  while (presentPercentage < desiredPercentage) {
    x++;
    presentPercentage = parseFloat(
      (((totalAttended + x) / (totalConducted + x)) * 100).toFixed(2)
    );
  }

  presentPercentage = initialPercentage;
  while (presentPercentage > desiredPercentage) {
    let tempPercentage = parseFloat(
      ((totalAttended / (totalConducted + (y + 1))) * 100).toFixed(2)
    );
    if (tempPercentage < desiredPercentage) {
      break;
    }
    presentPercentage = tempPercentage;
    y++;
  }

  if (initialPercentage === desiredPercentage) {
    document.getElementById(
      "result"
    ).innerText = `You have the correct percentage of ${desiredPercentage}%. Please maintain this.`;
  } else if (y === 0) {
    document.getElementById(
      "result"
    ).innerText = `Your current percentage is ${initialPercentage}%.\nYou need to attend ${x} more classes(50 min) to achieve ${desiredPercentage}%.`;
  } else {
    document.getElementById(
      "result"
    ).innerText = `Your current percentage is ${initialPercentage}%.\nYou can miss ${y} more classes(50 min) and still maintain a percentage of ${desiredPercentage}%.`;
  }
}
