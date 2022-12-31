import md5Hex from "md5-hex"
import "./Avatar.css"

export default function Avatar({ username }){

    const md5hex = md5Hex(username);

    return (
        <div style={{ display: "flex", }}>
            <img className="profile__image" alt="avatar" src={`https://www.gravatar.com/avatar/${md5hex}?d=monsterid&s=286`} />
        </div>
    )
}