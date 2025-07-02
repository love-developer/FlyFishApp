"use client";

import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";
import { useAuth } from "../../../context/AuthContext";
import { Eye } from "lucide-react";
import { UserService } from "../../../services/userService";
import SuccessModal from "../../SuccessModal";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function EditProfile() {
  const { user, updateUserInContext } = useAuth();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [lastName, setLastName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
  });
  const fileInputRef = useRef(null);
  const userService = new UserService();

  useEffect(() => {
    if (user) {
      setName(user.fullName || "");
      setMobile(user.phone || "");
      setLastName(""); // Lastname ko empty rakha, kyunki yeh update nahi hota jab tak user change kare
    }
  }, [user]);

  const triggerSuccessModal = (title, description) => {
    setModalContent({ title, description });
    setShowSuccessModal(true);
  };

  const handleSaveChanges = async () => {
    setIsUpdating(true);
    try {
      await userService.updateUser(user.uid, { fullName: name, phone: mobile, lastName });
      await updateUserInContext({ fullName: name, phone: mobile });
      triggerSuccessModal("Done!", "Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfilePicChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUpdating(true);
      try {
        const downloadURL = await userService.uploadProfilePicture(
          user.uid,
          file
        );
        await updateUserInContext({ profilePic: downloadURL });
        triggerSuccessModal("Done!", "Profile picture updated successfully!");
      } catch (error) {
        console.error(error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemovePicture = async () => {
    setIsUpdating(true);
    try {
      await userService.updateUser(user.uid, { profilePic: "" });
      await updateUserInContext({ profilePic: "" });
      triggerSuccessModal("Done!", "Profile picture removed successfully!");
    } catch (error) {
      console.error("Error removing profile picture:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const isSocialLogin = user.socialLoggedIn;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1023);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileMenuContainer}>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title={modalContent.title}
          description={modalContent.description}
        />
        {isUpdating && (
          <div className={styles.loadingOverlay}>
            <LoadingIndicator text="Updating profile..." />
          </div>
        )}
        <div className={styles.mobileProfileHeader}>
          <div className={styles.mobileInputSection}>
            <input
              className={styles.mobileFormInput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <input
              className={styles.mobileFormInput}
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile"
            />
            <input
              className={styles.mobileFormInput}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
            <a
              className={styles.saveLink}
              onClick={handleSaveChanges}
            >
              Save Changes
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.editProfileCard}>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={modalContent.title}
        description={modalContent.description}
      />
      {isUpdating && (
        <div className={styles.loadingOverlay}>
          <LoadingIndicator text="Updating profile..." />
        </div>
      )}
      <div className={styles.editProfileHeader}>
        <div className={styles.profileInfo}>
          <img
            src={
              user.profilePic ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt="Profile"
            className={styles.profileImage}
          />
          <div>
            <div className={styles.profileNameRow}>
              <span className={styles.profileName}>{user.fullName}</span>
              <span className={styles.profileEmail}>({user.email})</span>
            </div>
            <div className={styles.profileActionsRow}>
              <button
                className={styles.profileActionBtn}
                onClick={handleProfilePicChange}
              >
                Change Profile Picture
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                className={styles.profileActionBtn}
                onClick={handleRemovePicture}
              >
                Remove Picture
              </button>
              <button className={styles.profileActionBtn}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className={styles.languageDropdownWrapper}>
          <select className={styles.languageDropdown}>
            <option>English</option>
            <option>Arabic</option>
          </select>
        </div>
      </div>
      <form className={styles.editProfileForm} onSubmit={handleSaveChanges}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Your Name</label>
            <input
              className={styles.formInput}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Your Mobile Number</label>
            <input
              className={styles.formInput}
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>
        {!isSocialLogin && (
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  className={styles.formInput}
                  type="password"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="************"
                />
                <span className={styles.eyeIcon}>
                  <Eye />
                </span>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  className={styles.formInput}
                  type="password"
                  placeholder="************"
                />
                <span className={styles.eyeIcon}>
                  <Eye />
                </span>
              </div>
            </div>
            <div
              className={styles.formGroup}
              style={{ display: "flex", alignItems: "flex-end" }}
            >
              <button type="button" className={styles.changePasswordBtn}>
                Change password
              </button>
            </div>
          </div>
        )}
        <div className={styles.formActionsRow}>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" className={styles.discardBtn}>
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}