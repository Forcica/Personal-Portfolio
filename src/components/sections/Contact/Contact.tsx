import { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import emailjs from "@emailjs/browser";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
		project: "",
		budget: "",
			deadline: "",
	});
	const [status, setStatus] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("sending");
		setError("");

		try {
			await emailjs.send(
				"service_kdhoe87",
				"template_d0wjxzt",
				{
					from_name: formData.name,
					from_email: formData.email,
					message: formData.message,
					project_type: formData.project,
					budget: formData.budget,
					deadline: formData.deadline,
				},
				"DLHiNKLJE8bsBTyC4"
			);

			setStatus("success");
			setFormData({
				name: "",
				email: "",
				message: "",
				project: "",
				budget: "",
				deadline: "",
			});
		} catch (error) {
			console.error("Erreur:", error);
			setStatus("error");
		}
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" }
		}
	};

	return (
		<motion.section
			className="contact-section"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<div className="contact-background">
				<motion.div 
					className="wave-animation"
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.04 }}
					transition={{ duration: 2 }}
				/>
			</div>

			<motion.div
				className="contact-content"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
			>
				<h2 className="contact-title">
					連絡
					<span className="title-translation">Contact</span>
				</h2>
				<p className="contact-intro">
					Vous avez un projet web ? <br />
				</p>
				<p className="contact-introDesc">
					Je serai ravi d'en discuter avec vous ! <br />
					Décrivez brièvement votre besoin et je vous répondrai dans les
					24h.
				</p>
				<form onSubmit={handleSubmit} className="contact-form">
					<div className="form-group">
						<input
							type="text"
							placeholder="Votre nom"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Votre email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<textarea
							placeholder="Votre message"
							value={formData.message}
							onChange={(e) =>
								setFormData({ ...formData, message: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<select
							value={formData.project}
							onChange={(e) =>
								setFormData({ ...formData, project: e.target.value })
							}
							required
						>
							<option value="">Type de projet</option>
							<option value="site-vitrine">Site vitrine</option>
							<option value="e-commerce">Site e-commerce</option>
							<option value="application">Application web</option>
							<option value="autre">Autre</option>
						</select>
					</div>
					<div className="form-group">
						<select
							value={formData.budget}
							onChange={(e) =>
								setFormData({ ...formData, budget: e.target.value })
							}
							required
						>
							<option value="">Budget envisagé</option>
							<option value="< 1k">Moins de 1 000 €</option>
							<option value="1k-5k">1 000 € - 5 000 €</option>
							<option value="5k+">Plus de 5 000 €</option>
							<option value="à définir">À définir ensemble</option>
						</select>
					</div>
					<div className="form-group">
						<input
							type="text"
							placeholder="Délai souhaité (optionnel)"
							value={formData.deadline}
							onChange={(e) =>
								setFormData({ ...formData, deadline: e.target.value })
							}
						/>
					</div>
					<button
						type="submit"
						className={`submit-button ${status}`}
						disabled={status === "sending"}
					>
						{status === "sending"
							? "Envoi en cours..."
							: "Discuter de votre projet"}
					</button>
					{status === "success" && (
						<p className="success-message">
							Message envoyé avec succès !
						</p>
					)}
					{status === "error" && (
						<p className="error-message">
							{error || "Une erreur est survenue"}
						</p>
					)}
				</form>
			</motion.div>
		</motion.section>
	);
};

export default Contact;
