import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

const RestaurantProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // For email/password change modals
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "restaurants", user.uid);
          const docSnap = await getDoc(docRef);
          setProfile({
            name: docSnap.exists()
              ? docSnap.data().name || ""
              : user.displayName || "",
            email: user.email || "",
            phone: docSnap.exists() ? docSnap.data().phone || "" : "",
            address: docSnap.exists() ? docSnap.data().address || "" : "",
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(
          doc(db, "restaurants", user.uid),
          {
            name: profile.name,
            phone: profile.phone,
            address: profile.address,
          },
          { merge: true }
        );
        Alert.alert("Success", "Profile updated!");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally navigate to login screen here
    } catch (error) {
      Alert.alert("Error", "Failed to log out.");
    }
  };

  // --- Email Change ---
  const handleEmailChange = async () => {
    setChanging(true);
    try {
      const user = auth.currentUser;
      if (user && currentPassword && newEmail) {
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail);
        setProfile((prev) => ({ ...prev, email: newEmail }));
        Alert.alert("Success", "Email updated!");
        setShowEmailModal(false);
        setNewEmail("");
        setCurrentPassword("");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update email.");
    } finally {
      setChanging(false);
    }
  };

  // --- Password Change ---
  const handlePasswordChange = async () => {
    setChanging(true);
    try {
      const user = auth.currentUser;
      if (user && currentPassword && newPassword) {
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Alert.alert("Success", "Password updated!");
        setShowPasswordModal(false);
        setNewPassword("");
        setCurrentPassword("");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update password.");
    } finally {
      setChanging(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Restaurant Profile</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={profile.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Enter restaurant name"
      />
      <Text style={styles.label}>Email</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <TextInput
          style={[styles.input, { flex: 1, backgroundColor: "#eee" }]}
          value={profile.email}
          editable={false}
        />
        <Button title="Change" onPress={() => setShowEmailModal(true)} />
      </View>
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={profile.phone}
        onChangeText={(text) => handleChange("phone", text)}
        placeholder="Enter phone"
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={profile.address}
        onChangeText={(text) => handleChange("address", text)}
        placeholder="Enter address"
      />
      <View style={{ marginTop: 16, width: "100%" }}>
        <Button
          title="Change Password"
          onPress={() => setShowPasswordModal(true)}
        />
      </View>
      <View style={{ marginTop: 16, width: "100%" }}>
        <Button
          title={saving ? "Saving..." : "Save Changes"}
          onPress={handleSave}
          disabled={saving}
        />
      </View>
      <View style={{ marginTop: 16, width: "100%" }}>
        <Button title="Log Out" onPress={handleLogout} color="#d9534f" />
      </View>

      {/* Email Change Modal */}
      <Modal visible={showEmailModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Email</Text>
            <TextInput
              style={styles.input}
              placeholder="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <Button
              title={changing ? "Updating..." : "Update Email"}
              onPress={handleEmailChange}
              disabled={changing}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setShowEmailModal(false);
                setNewEmail("");
                setCurrentPassword("");
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Password Change Modal */}
      <Modal visible={showPasswordModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <Button
              title={changing ? "Updating..." : "Update Password"}
              onPress={handlePasswordChange}
              disabled={changing}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setShowPasswordModal(false);
                setNewPassword("");
                setCurrentPassword("");
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#888",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default RestaurantProfileScreen;
