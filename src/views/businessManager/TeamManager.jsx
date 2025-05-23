import { motion } from "framer-motion";
import './styles/TeamManager.css';

const TeamManager = ({store}) => {
  return (
    <div>

        {store?.owners?.length> 0 && <motion.div
            className="store-site-owners"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            >
            <h3>The Owners</h3>
            <div className="owner-grid">
                {store?.owners?.map((owner, index) => (
                <div className="owner-card" key={index}>
                    <img
                    src={owner.img || "https://placehold.co/80x80?text=Owner"}
                    alt={owner.name}
                    className="owner-img"
                    />
                    <p className="owner-name">{owner.name}</p>
                </div>
                ))}
            </div>
            </motion.div>}
    </div>
  )
}

export default TeamManager