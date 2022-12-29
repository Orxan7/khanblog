import "./Avatar.css"

export default function Avatar(){
    return (
        <div style={{ display: "flex", }}>
            <img className="profile__image" alt="avatar" src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286" />
        </div>
    )
}