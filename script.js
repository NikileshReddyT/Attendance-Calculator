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

  // Validation checks
  if (
    isNaN(desiredPercentage) ||
    desiredPercentage < 0 ||
    desiredPercentage > 100
  ) {
    document.getElementById("result").innerText =
      "Please enter a valid desired percentage (0-100).";
    return;
  }

  const totalConducted = conductedClasses.reduce((acc, cur) => acc + cur, 0);
  const totalAttended = attendedClasses.reduce((acc, cur) => acc + cur, 0);

  if (totalAttended > totalConducted) {
    document.getElementById("result").innerText =
      "Attended classes cannot exceed conducted classes. Please check the details.";
    return;
  }

  let presentPercentage = parseFloat(
    ((totalAttended / totalConducted) * 100).toFixed(2)
  );
  let initialPercentage = presentPercentage;
  let x = 0;
  let y = 0;
  let numerator, denominator;

  // Calculate the number of additional classes needed to achieve the desired percentage
  while (presentPercentage < desiredPercentage) {
    x++;
    presentPercentage = parseFloat(
      (((totalAttended + x) / (totalConducted + x)) * 100).toFixed(2)
    );
  }

  numerator = totalAttended + x;
  denominator = totalConducted + x;

  presentPercentage = initialPercentage;

  // Calculate the number of classes that can be missed while maintaining the desired percentage
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

  // Formatting the result message
  if (initialPercentage === desiredPercentage) {
    document.getElementById(
      "result"
    ).innerText = `You have the correct percentage of ${desiredPercentage}%. Please maintain this.`;
  } else if (x === 0 && y === 0) {
    document.getElementById(
      "result"
    ).innerText = `Your current percentage is ${totalAttended} / ${totalConducted} = ${initialPercentage}%.\n\nNo further action is required to meet the desired percentage.`;
  } else if (x > 0) {
    document.getElementById(
      "result"
    ).innerText = `Your current percentage is ${totalAttended} / ${totalConducted} = ${initialPercentage}%.\n\nTo achieve ${desiredPercentage}%, you need to attend ${x} more classes (50 min).\n\nAfter this, your percentage will be ${parseFloat(
      ((numerator / denominator) * 100).toFixed(2)
    )}% (${numerator}/${denominator}).`;
  } else if (y > 0) {
    document.getElementById(
      "result"
    ).innerText = `Your current percentage is ${totalAttended} / ${totalConducted} = ${initialPercentage}%.\n\nYou can miss ${y} more classes (50 min) and still maintain a percentage of ${desiredPercentage}%.\n\nAfter missing these classes, your percentage will be ${parseFloat(
      ((totalAttended / (totalConducted + y)) * 100).toFixed(2)
    )}% (${totalAttended}/${totalConducted + y}).`;
  }
}
