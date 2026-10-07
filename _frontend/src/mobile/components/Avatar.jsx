import femaleAvatar from "../../assets/FemaleAvatar.png";
import femaleDoctorAvatar from "../../assets/FemaleDoctorAvatar.png";
import maleAvatar from "../../assets/MaleAvatar.png";
import maleDoctorAvatar from "../../assets/MaleDoctorAvatar.png";

function getGender(gender) {
  const normalizedGender = String(gender || "")
    .trim()
    .toLowerCase();

  if (["female", "f", "woman", "nu", "nữ"].includes(normalizedGender)) {
    return "female";
  }

  return "male";
}

function Avatar({ gender, type = "patient", className = "" }) {
  const isFemale = getGender(gender) === "female";
  const isDoctor = type === "doctor";
  const avatar = isDoctor
    ? isFemale
      ? femaleDoctorAvatar
      : maleDoctorAvatar
    : isFemale
      ? femaleAvatar
      : maleAvatar;

  return <img className={className} src={avatar} alt="" />;
}

export default Avatar;
