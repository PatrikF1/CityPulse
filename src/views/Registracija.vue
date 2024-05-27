<template>
    <div class="registracija">
        <form class="forma" @submit.prevent="registracija">
            <div class="korsinicko">
                <label for="korisnickoime" class="form-label">Korisničko ime</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Username" v-model="korisnickoIme" required>
            </div>
            <div class="godine">
                <label for="godiste" class="form-label">Unesite Godine</label>
                <input type="number" class="form-control" id="validationDefault02" placeholder="Age" v-model="godine" required>
            </div>
            <div class="email">
                <label for="email1" class="form-label">Email</label>
                <input type="email" class="form-control" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" v-model="email" required>
            </div>
            <div class="lozinka">
                <label for="loz" class="form-label">Lozinka</label>
                <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password" id="validationDefault03" v-model="lozinka" required>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleShowPassword">
                        {{ showPassword ? 'Sakrij' : 'Prikaži' }}
                    </button>
                </div>
            </div>
            <div class="lozinka1">
                <label for="loz1" class="form-label">Ponovi Lozinku</label>
                <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Repeat Password" id="validationDefault04" v-model="lozinka1" required>
                    <button type="button" class="btn btn-outline-secondary" @click="toggleShowPassword">
                        {{ showPassword ? 'Sakrij' : 'Prikaži' }}
                    </button>
                </div>
            </div>
            <div class="gumb">
                <button class="btn btn-primary" type="submit">Registriraj se</button>
            </div>
        </form>
    </div>
</template>

<script>
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'Registracija', 
    data() {
        return {
            email: '',
            korisnickoIme: '',
            godine: '',
            lozinka: '',
            lozinka1: '',
            showPassword: false
        };
    },
    methods: {
        registracija() {
            if (this.godine < 16) {
                alert("Premlad korisnik, minimalne godine su 16");
                return;
            }
            if (this.lozinka !== this.lozinka1) {
                alert("Lozinke se ne podudaraju, molimo pokušajte ponovo!");
                return;
            }

            var self = this;
            createUserWithEmailAndPassword(auth, this.email, this.lozinka)
                .then(function(userCredential) {
                    var user = userCredential.user;
                    console.log('Prijavljen korisnik:', user.email);
                    alert("Hvala na prijavi " + self.korisnickoIme);
                    self.$router.push('/login');
                })
                .catch(function(error) {
                    console.error('Greška pri registraciji:', error);
                    alert("Greška pri registraciji: " + error.message);
                });
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style>

</style>
