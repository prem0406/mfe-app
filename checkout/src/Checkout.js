export default function Checkout() {
  return (
    <div style={{ border: "2px dashed #dc2626", padding: 16, borderRadius: 8 }}>
      <h2>💳 Checkout MFE</h2>
      <input placeholder="Name" /> <input placeholder="Card number" />
      <button>Pay now</button>
    </div>
  );
}
