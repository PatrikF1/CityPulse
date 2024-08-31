<template>
    <div id="profil">
        <Navigacija/>
        <div class="profil-container">
            <h3>Profil korisnika</h3>
            <div v-if="user">
                <div class="user-info">
                    <div @click="triggerFileInput" class="profile-picture-container">
                        <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="profile-picture"/>
                        <div class="overlay-text">Kliknite za promjenu</div>
                        <input type="file" ref="fileInput" @change="onFileSelected" accept="image/*" style="display: none;">
                    </div>
                    <button v-if="newProfileImage" @click="uploadProfilePicture" class="btn-save-bio">Potvrdi</button> 
                    <div class="user-details">
                        <p style="text-align: center; font-size: 30px;">{{ user.korisnickoIme }}</p>
                        <p style="text-align: center;">{{ user.email }}</p>

                        <div v-if="user.bio">
                            <p style="text-align: center;"><strong>Bio:</strong> <br>{{ user.bio }}</p>
                            <button @click="deleteBio" class="btn-delete-bio">Izbriši Bio</button>
                        </div>

                        <div v-else>
                            <textarea v-model="bio" placeholder="Napišite nešto o sebi..." class="bio-textarea"></textarea>
                            <button v-if="bio" @click="saveBio" class="btn-save-bio">Potvrdi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Nema Podataka!</p>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navigacija from '@/components/Navigacija.vue';
import { auth, db } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "@/firebase";

export default {
    name: 'Profil',
    components: { Footer, Navigacija },
    data() {
        return {
            user: null,
            bio: '',
            newProfileImage: null,
        };
    },
    async created() {
        const currentUser = auth.currentUser;
        if (currentUser) {
            try {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    this.user = userDoc.data();
                }
            } catch (error) {
                console.error('Greška pri dohvaćanju korisničkih podataka:', error);
            }
        }
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileSelected(event) {
            this.newProfileImage = event.target.files[0];
        },
        async uploadProfilePicture() {
            if(this.newProfileImage) {
                try {
                    const currentUser = auth.currentUser;
                    const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
                    await uploadBytes(storageRef, this.newProfileImage);
                    const photoURL = await getDownloadURL(storageRef);
                    await updateDoc(doc(db, 'users', currentUser.uid), { photoURL });
                    this.user.photoURL = photoURL;
                    this.newProfileImage = null;
                } catch (error) {
                    console.error('Greška pri otpremanju profilne slike:', error);
                }
            }
        },
        async saveBio() {
            if (this.bio) {
                try {
                    const userRef = doc(db, 'users', auth.currentUser.uid);
                    await updateDoc(userRef, { bio: this.bio });
                    this.user.bio = this.bio;
                    this.bio = '';
                } catch (error) {
                    console.error('Greška pri čuvanju biografije:', error);
                }
            }
        },
        async deleteBio() {
            if (this.user.bio) {
                try {
                    const userRef = doc(db, 'users', auth.currentUser.uid);
                    await updateDoc(userRef, { bio: '' });
                    this.user.bio = '';
                } catch (error) {
                    console.error('Greška pri brisanju biografije:', error);
                }
            }
        }
    }
};
</script>

<style>

.upload-btn {
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 5px;
    border: 1px solid #76E3ED;
    border-radius: 8px;
    background-color: #243A45;
    color: #76E3ED;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    text-align: center;
}

.upload-btn:hover {
    background-color: #5BC0DE;
    color: #fff;
}

#profil {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #76ABAE;
}

.profil-container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #1B262C;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
    color: #fff;
}

.overlay-text {
    position: absolute;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.profile-picture-container:hover .overlay-text {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.5);
    width: 10%;
    height: 15%;
    border-radius: 50%;
    padding-top: 55px;
}

h3 {
    color: #76E3ED;
    margin-bottom: 25px;
    font-size: 28px;
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid #76E3ED;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
}

.user-details {
    text-align: left;
    width: 100%;
}

.user-details p {
    margin: 10px 0;
    font-size: 18px;
    line-height: 1.5;
    color: #A9D6E5;
}

p strong {
    color: #76E3ED;
}

.bio-textarea {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    border-radius: 8px;
    border: 1px solid #76E3ED;
    font-size: 16px;
    resize: none;
    background-color: #243A45;
    color: #fff;
}

.btn-save-bio {
    font-weight: bold;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #76E3ED;
    color: #1B262C;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-delete-bio {
    font-weight: bold;
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #cc6868;
    color: #1B262C;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-save-bio:hover {
    background-color: #5BC0DE;
}

.btn-delete-bio:hover {
    background-color: red;
}

footer {
    margin-top: auto;
    padding: 10px;
    background-color: #1B262C;
    text-align: center;
    color: #A9D6E5;
}
</style>
