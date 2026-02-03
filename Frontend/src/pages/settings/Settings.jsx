import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

export default function Settings({ user, setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    visibility: "public",

    // student
    learningMode: "video",
    emailNotifications: true,

    // admin
    adminNotes: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        visibility: user.visibility || "public",
        learningMode: user.learningMode || "video",
        emailNotifications: user.emailNotifications ?? true,
        adminNotes: user.adminNotes || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.put("/users/me", {
        ...form,
        password: password.new || undefined,
        currentPassword: password.current || undefined,
      });

      setUser(res.data);
      setSuccess("Settings updated successfully ✅");
      setPassword({ current: "", new: "" });
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="max-w-7xl mx-auto bg-gray-50  p-8 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Account Settings</h2>
            <p className="text-gray-500 text-sm">
              Manage your personal information and preferences
            </p>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <button className="text-sm text-yellow-600 hover:underline">
              Change Avatar
            </button>
          </div>
        </div>

        {/* PROFILE + PREFERENCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT */}
          <Section title="Profile Information">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input label="Email" value={form.email} disabled />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Textarea
              label="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
            />
          </Section>

          {/* RIGHT */}
          <Section title="Preferences">
            <Select
              label="Profile Visibility"
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              options={[
                { label: "Public", value: "public" },
                { label: "Private", value: "private" },
              ]}
            />

            {user?.role === "student" && (
              <>
                <Select
                  label="Learning Mode"
                  name="learningMode"
                  value={form.learningMode}
                  onChange={handleChange}
                  options={[
                    { label: "Video", value: "video" },
                    { label: "Reading", value: "reading" },
                    { label: "Live Sessions", value: "live" },
                  ]}
                />
                <Checkbox
                  label="Email Notifications"
                  name="emailNotifications"
                  checked={form.emailNotifications}
                  onChange={handleChange}
                />
              </>
            )}

            {user?.role === "admin" && (
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p>
                  <strong>Role:</strong> Administrator
                </p>
                <p>
                  <strong>Access:</strong> Full System Control
                </p>
              </div>
            )}
          </Section>
        </div>

        {/* PASSWORD */}
        <Section title="Security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Current Password"
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
            />
            <Input
              label="New Password"
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
            />
          </div>
        </Section>

        {/* DANGER ZONE */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
          <button disabled className="text-sm text-red-400 cursor-not-allowed">
            Delete Account (Coming Soon)
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center pt-6">
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <button
            disabled={loading}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {success && <p className="text-green-600">{success}</p>}
      </div>
    </div>
  );
}

/* ---------------- REUSABLE UI ---------------- */

function Section({ title, children }) {
  return (
    <div className="space-y-4 border rounded p-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className="w-full border rounded px-3 py-2" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select {...props} className="w-full border rounded px-3 py-2">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}

function Info({ label, value }) {
  return (
    <p className="text-sm text-gray-600">
      <strong>{label}:</strong> {value}
    </p>
  );
}
