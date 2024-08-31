<template>
    <div class="registracija">
        <h1 class="text-center mb-4">Registracija</h1>
        <form class="forma" >
            <div class="mb-3">
                <label for="korisnickoime" class="form-label">Korisničko ime</label>
                <input type="text" class="form-control" id="korisnickoime" placeholder="Username" v-model="korisnickoIme" required>
            </div>
            <div class="mb-3">
                <label for="datumRodenja" class="form-label">Datum Rođenja</label>
                <input type="date" class="form-control" id="datumRodenja" v-model="datumRodenja" required>
            </div>
            <div class="mb-3">
                <label for="email1" class="form-label">Email</label>
                <input type="email" class="form-control" id="email1" placeholder="Email" v-model="email" required>
            </div>
            <div class="mb-3">
                <label for="loz" class="form-label">Lozinka</label>
                <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password" id="loz" v-model="lozinka" required>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleShowPassword">
                        {{ showPassword ? 'Sakrij' : 'Prikaži' }}
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label for="loz1" class="form-label">Ponovi Lozinku</label>
                <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Repeat Password" id="loz1" v-model="lozinka1" required>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleShowPassword">
                        {{ showPassword ? 'Sakrij' : 'Prikaži' }}
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label for="profilnaSlika" class="form-label">Profilna Slika</label>
                <input type="file" class="form-control" id="profilnaSlika" @change="handleFileChange" accept="image/*">
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-primary" type="button" @click="registracija()">Registriraj se</button>
                <b>Imate vec profil? <router-link class="l" to="/login">Login</router-link></b>
            </div>
        </form>
    </div>
</template>

<script>
import { auth, db, storage } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default {
    name: 'Registracija',
    data() {
        return {
            email: '',
            korisnickoIme: '',
            datumRodenja: '',
            lozinka: '',
            lozinka1: '',
            showPassword: false,
            profileImage: null,
        };
    },
    methods: {
        provjeriStarost(datumRodenja) {
            const danasnjiDatum = new Date();
            const datumRodjenja = new Date(datumRodenja);
            const razlikaGodina = danasnjiDatum.getFullYear() - datumRodjenja.getFullYear();
            const razlikaMjeseci = danasnjiDatum.getMonth() - datumRodjenja.getMonth();
            const razlikaDana = danasnjiDatum.getDate() - datumRodjenja.getDate();
            if (razlikaGodina > 16 || (razlikaGodina === 16 && (razlikaMjeseci > 0 || (razlikaMjeseci === 0 && razlikaDana >= 0)))) {
                return true;
            }
            return false;
        },

         handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.profileImage = file;
        }
    },

        async registracija() {
            
            if (!this.provjeriStarost(this.datumRodenja)) {
                alert("Premlad korisnik, minimalne godine su 16!");
                return;
            }
            if (this.lozinka !== this.lozinka1) {
                alert("Lozinke se ne podudaraju, molimo pokušajte ponovo!");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.lozinka);
                const user = userCredential.user;

                let photoURL = '';
                if(this.profileImage) {
                    const storageRef = ref(storage, `profile_images/${user.uid}`);
                    const snapshot = await uploadBytes(storageRef, this.profileImage);
                    photoURL = await getDownloadURL(snapshot.ref)
                }

                await setDoc(doc(db, 'users', user.uid), {
                    korisnickoIme: this.korisnickoIme,
                    datumRodenja: this.datumRodenja,
                    email: this.email,
                    photoURL: photoURL,  
                });

                console.log('Prijavljen korisnik:', user.email);
                alert("Hvala na prijavi " + this.korisnickoIme);
                this.$router.replace('Login');
            } catch (error) {
                console.error('Greška pri registraciji:', error);
                alert("Greška pri registraciji: " + error.message);
            }
            
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style scoped>
.registracija {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.text-center {
    text-align: center;
}

.mb-4 {
    margin-bottom: 1.5rem;
}

.mb-3 {
    margin-bottom: 1rem;
}

.form-label {
    font-weight: bold;
}

.input-group .btn {
    margin-left: 10px;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.l {
    text-decoration: none;
}


</style>
