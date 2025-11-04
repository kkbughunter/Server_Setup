import { useEffect, useState, useCallback } from "react";
import mqtt from "mqtt";

export default function App() {
  const [status, setStatus] = useState("Connecting...");
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [publishMsg, setPublishMsg] = useState(generateRandomValue());
  const [pubTopic, setPubTopic] = useState("iet/test");
  const [subTopic, setSubTopic] = useState("iet/temp");
  const [currentSubTopic, setCurrentSubTopic] = useState("iet/temp");

  // --- Helper: Generate Random Value ---
  function generateRandomValue() {
    const min = 20;
    const max = 35;
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  // --- Connect to MQTT Broker ---
  useEffect(() => {
    const mqttClient = mqtt.connect("ws://astraval.com:9001/mqtt", {
      username: "testuser",
      password: "password1",
      reconnectPeriod: 3000,
      clean: true,
      clientId: 'web_' + Math.random().toString(16).substr(2, 8),
    });

    mqttClient.on("connect", () => {
      setStatus("✅ Connected");
      console.log("✅ Connected to broker");
      
      // Subscribe to initial topic
      mqttClient.subscribe(subTopic, (err) => {
        if (!err) {
          console.log(`✅ Subscribed to: ${subTopic}`);
          setCurrentSubTopic(subTopic);
        } else {
          console.error("❌ Subscribe failed:", err);
        }
      });
    });

    mqttClient.on("reconnect", () => {
      console.log("🔄 Reconnecting...");
      setStatus("Reconnecting...");
    });
    
    mqttClient.on("close", () => {
      console.log("🔌 Disconnected");
      setStatus("Disconnected ❌");
    });
    
    mqttClient.on("error", (err) => {
      console.error("❌ MQTT Error:", err);
      setStatus(`Error: ${err.message}`);
    });

    mqttClient.on("message", (topic, payload) => {
      const msg = payload.toString();
      const time = new Date().toLocaleTimeString();
      
      console.log(`📩 Received on ${topic}: ${msg}`);

      // --- Add message to log ---
      const log = { topic, message: msg, time };
      setMessages((prev) => [log, ...prev.slice(0, 49)]);
    });

    setClient(mqttClient);
    
    return () => {
      console.log("🛑 Disconnecting MQTT client");
      mqttClient.end();
    };
  }, []); // Only run once on mount

  // --- Publish Function ---
  const handlePublish = useCallback(() => {
    if (!client || !publishMsg.trim()) return;
    
    client.publish(pubTopic, publishMsg, { qos: 1 }, (err) => {
      if (!err) {
        console.log(`📤 Published to ${pubTopic}: ${publishMsg}`);
      } else {
        console.error("❌ Publish failed:", err);
      }
    });
    
    setPublishMsg(generateRandomValue());
  }, [client, pubTopic, publishMsg]);

  // --- Change Subscription Topic ---
  const handleChangeSub = useCallback(() => {
    if (!client || !subTopic.trim()) return;
    
    // Unsubscribe from current topic
    if (currentSubTopic) {
      client.unsubscribe(currentSubTopic, (err) => {
        if (!err) {
          console.log(`✅ Unsubscribed from: ${currentSubTopic}`);
        }
      });
    }
    
    // Subscribe to new topic
    client.subscribe(subTopic, (err) => {
      if (!err) {
        console.log(`✅ Subscribed to: ${subTopic}`);
        setCurrentSubTopic(subTopic);
        setMessages([]);
      } else {
        console.error("❌ Subscribe failed:", err);
      }
    });
  }, [client, subTopic, currentSubTopic]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🚀 MQTT Real-time Dashboard
        </h1>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="font-semibold mb-2">🔗 Connection Status</h2>
          <p className="text-lg">{status}</p>
          <p className="text-sm text-gray-600 mt-1">
            Currently subscribed to: <strong>{currentSubTopic}</strong>
          </p>
        </div>

        {/* Topic Configuration */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="font-semibold mb-3">⚙️ Topic Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subscribe Topic:</label>
              <div className="flex">
                <input
                  type="text"
                  value={subTopic}
                  onChange={(e) => setSubTopic(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 mr-2"
                  placeholder="e.g., sensor/# or iet/temp"
                />
                <button
                  onClick={handleChangeSub}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publish Topic:</label>
              <input
                type="text"
                value={pubTopic}
                onChange={(e) => setPubTopic(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="e.g., iet/test"
              />
            </div>
          </div>
        </div>

        {/* Publish Message */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="font-semibold mb-3">📤 Publish Message</h2>
          <div className="flex">
            <input
              type="text"
              value={publishMsg}
              onChange={(e) => setPublishMsg(e.target.value)}
              placeholder="Type message or auto-random..."
              onKeyDown={(e) => e.key === "Enter" && handlePublish()}
              className="flex-1 border rounded-lg px-3 py-2 mr-2"
            />
            <button
              onClick={handlePublish}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        </div>

{/* Message Log */}
        <div className="bg-white rounded-lg shadow-md p-4 h-80 overflow-y-auto">
          <h2 className="font-semibold mb-2">📩 Message Log</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet...</p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200 text-sm"
              >
                <p className="font-semibold text-blue-700">{m.topic}</p>
                <p className="font-mono text-gray-800">{m.message}</p>
                <p className="text-xs text-gray-500 mt-1">{m.time}</p>
              </div>
            ))
          )}
        </div>

        <footer className="mt-6 text-center text-sm text-gray-500">
          🌐 Broker: astraval.com:9001 | React + MQTT.js | TailwindCSS
        </footer>
      </div>
    </div>
  );
}
