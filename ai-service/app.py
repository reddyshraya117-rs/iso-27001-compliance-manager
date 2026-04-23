from flask import Flask

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok"}

from routes.sanitise import sanitise_bp
app.register_blueprint(sanitise_bp)

if __name__ == "__main__":
    print("Starting Flask...")
    app.run(host="0.0.0.0", port=5000, debug=True)