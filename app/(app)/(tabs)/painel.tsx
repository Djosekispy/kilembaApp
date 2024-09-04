import PainelCard from '@/components/Admin/molecules/PainelCard';
import CandidateList from '@/components/candidateList/organism/CandidateList';
import Label from '@/components/Form/atoms/Label';
import Title from '@/components/Modal/atoms/title';
import { db } from '@/utils/firebase';
import {
    doc,
    setDoc,
    getDocs,
    addDoc,
    serverTimestamp,
    collection,
    query, 
    updateDoc,
    onSnapshot, 
    where,
    and
  } from 'firebase/firestore';
  import {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, View } from 'react-native';

export default function Painel(){
    const [apartamentos, setApartamentos] = useState([]);
    const [vivendasInsoladas, setVivendasInsoladas] = useState([]);
    const [vivendasGeminadas, setVivendasGeminadas] = useState([]);
    const [candidatos, setCandidatos] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
   
     const [sorteiodeApartamentosRealizado, setSorteiodeApartamentosRealizado] = useState(false);
     const [sorteiodeVivendasGeminadasRealizado, setSorteiodeVivendasGeminadasRealizado ] = useState(false);
   
   const [sorteiodeVivendasInsoladasRealizado, setSorteiodeVivendasInsoladasRealizado ] = useState(false);
   
   
   
   
   const totalPorApatamentos = ()=>{
    const q = query(collection(db, "candidatos"),where('tipo','==','Apartamentos'));
     const unsubscribeData = onSnapshot(q, (querySnapshot) => {
        const modulo: any = [];
        querySnapshot.forEach((doc) => {
         modulo.push(doc.data());
        });
     setApartamentos(modulo);
       });
   };
   
   
   const totalPorVivendasGeminadas = ()=>{
        const q = query(collection(db, "candidatos"),where('tipo','==','Vivendas Insoladas'));
     const unsubscribeData = onSnapshot(q, (querySnapshot) => {
        const modulo: any = [];
        querySnapshot.forEach((doc) => {
         modulo.push(doc.data());
        });
     setVivendasInsoladas(modulo);
       });
   
   }
   const totalPorVivendasInsoladas = ()=>{
            const q = query(collection(db, "candidatos"),where('tipo','==','Vivendas Geminadas'));
     const unsubscribeData = onSnapshot(q, (querySnapshot) => {
        const modulo: any = [];
        querySnapshot.forEach((doc) => {
         modulo.push(doc.data());
        });
     setVivendasGeminadas(modulo);
       });
   }
   
   const TotaldeInscrito = ()=>{
            const q = query(collection(db, "candidatos"));
     const unsubscribeData = onSnapshot(q, (querySnapshot) => {
        const modulo: any = [];
        querySnapshot.forEach((doc) => {
         modulo.push(doc.data());
        });
     setCandidatos(modulo);
       });
   }
   
   const FazerSorteioApartamentos = async () => {
     try {
       setIsLoading(true);
        const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
       where('sorteado', '==', false),
       where('tipo', '==', 'Apartamentos'),
        where('estado', '==', 'aprovado')
   ));
       const apartamentosNaoSorteados: any = [];
       querySnapshot.forEach((doc) => {
         apartamentosNaoSorteados.push({ id: doc.id, ...doc.data() });
       });
       const sorteadosApartamento = shuffleArray(apartamentosNaoSorteados);
   
      for (let i = 0; i < 200; i++) {
         await addDoc(collection(db, 'apartamentosSorteados'), {
           nome: sorteadosApartamento[i].nome,
           referencia: sorteadosApartamento[i].referencia
         });
         await updateDoc(doc(db, 'candidatos', sorteadosApartamento[i].id), {
           sorteado: true
         });
       }
       
     } catch (error) {
       console.error(error);
     } finally {
       setIsLoading(false);
     }
   };
   
   function shuffleArray(array:any) {
     for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
     }
     return array;
   }
   
   
   const FazerSorteioVivendasGeminadas = async () => {
     try {
       setIsLoading(true);
        const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
       where('sorteado', '==', false),
       where('tipo', '==', 'Vivendas Geminadas'),
       where('estado', '==', 'aprovado')
   ));
       const VivendasNaoSorteados: any = [];
       querySnapshot.forEach((doc) => {
         VivendasNaoSorteados.push({ id: doc.id, ...doc.data() });
       });
       const sorteadosVivendas = shuffleArray(VivendasNaoSorteados);
        for (let i = 0; i < 200; i++) {
         await addDoc(collection(db, 'geminadasSorteados'), {
           nome: sorteadosVivendas[i].nome,
           referencia: sorteadosVivendas[i].referencia
         });
         await updateDoc(doc(db, 'candidatos', sorteadosVivendas[i].id), {
           sorteado: true
         });
       }
       
     } catch (error) {
       console.error(error);
     } finally {
       setIsLoading(false);
     }
   };
   
   
   
   const FazerSorteioVivendasInsoladas = async () => {
     try {
       setIsLoading(true);
        const querySnapshot = await getDocs(query(collection(db, 'candidatos'), 
       where('sorteado', '==', false),
       where('tipo', '==', 'Vivendas Insoladas'),
       where('estado', '==', 'aprovado')
   ));
       const VivendasNaoSorteados: any = [];
       querySnapshot.forEach((doc) => {
         VivendasNaoSorteados.push({ id: doc.id, ...doc.data() });
       });
       const sorteadosVivendas = shuffleArray(VivendasNaoSorteados);
       for (let i = 0; i < 200; i++) {
         await addDoc(collection(db, 'insoladasSorteados'), {
           nome: sorteadosVivendas[i].nome,
           referencia: sorteadosVivendas[i].referencia
         });
         await updateDoc(doc(db, 'candidatos', sorteadosVivendas[i].id), {
           sorteado: true
         });
       }
       
     } catch (error) {
       console.error(error);
     } finally {
       setIsLoading(false);
     }
   };
   
   
   
   const verificaSorteioFeito = async (nomeColecaoSorteio:string) => {
     const sorteioRef = collection(db, nomeColecaoSorteio);
     const querySnapshot = await getDocs(sorteioRef);
     return !querySnapshot.empty;
   }
   
   
   
   useEffect(()=>{
      totalPorApatamentos();
       TotaldeInscrito();
       totalPorVivendasGeminadas();
       totalPorVivendasInsoladas();
   
       /*Sorteio Realizados*/
       verificaSorteioFeito('apartamentosSorteados').then((sorteioFeito) => {
         setSorteiodeApartamentosRealizado(sorteioFeito);
       });
   
    verificaSorteioFeito('geminadasSorteados').then((sorteioFeito) => {
         setSorteiodeVivendasGeminadasRealizado(sorteioFeito);
       });
   
    verificaSorteioFeito('insoladasSorteados').then((sorteioFeito) => {
         setSorteiodeVivendasInsoladasRealizado(sorteioFeito);
       });
   
   
   
   },[]);
    return(
        <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
            <View className='flex-1 items-center pt-12 px-4'>
                <Title className="text-[#000929] text-2xl font-semiBoldPopins">Painel de Gestão</Title>
                <Label className="text-[#616161] text-sm text-center pt-2" text='Administre o sistema com responsabilidade e a justiça virá em bónus' />
            </View>
            <View className="flex-row flex-wrap justify-evenly items-center mt-10">
    
            <View className={`items-center mt-1 p-2 rounded-md ${sorteiodeApartamentosRealizado ? 'bg-[#478FF1]' : 'bg-[#B9B9B9]'}`}>
    <TouchableOpacity className={`items-center`}  disabled={sorteiodeApartamentosRealizado} onPress={() => FazerSorteioApartamentos()}>
   <Label text="Apartamentos" className="font-regularPopins text-sm"/>
    </TouchableOpacity>
    </View> 

    <View className={`items-center mt-1 p-2 rounded-md ${sorteiodeVivendasInsoladasRealizado ? 'bg-[#478FF1]' : 'bg-[#B9B9B9]'}`}>
    <TouchableOpacity className={`items-center`}   disabled={sorteiodeVivendasInsoladasRealizado} onPress={()=>FazerSorteioVivendasInsoladas()}>
   <Label text="Insoladas" className="font-regularPopins text-sm"/>
    </TouchableOpacity>
    </View> 

    <View className={`items-center mt-1 p-2 rounded-md ${sorteiodeVivendasGeminadasRealizado ? 'bg-[#478FF1]' : 'bg-[#B9B9B9]'}`}>
    <TouchableOpacity className={`items-center`}   disabled={sorteiodeVivendasGeminadasRealizado} onPress={()=>FazerSorteioVivendasGeminadas()}>
   <Label text="Geminadas" className="font-regularPopins text-sm"/>
    </TouchableOpacity>
    </View> 
    <View className='flex-row justify-between'>
    <PainelCard 
  tipo='Apartamentos' 
  total={apartamentos.length}
   porcentagem={ ((apartamentos.length/candidatos.length ) * 100).toFixed(2) } />

  <PainelCard 
  tipo='Vivendas Geminadas' 
  total={vivendasGeminadas.length}
   porcentagem={((vivendasGeminadas.length/candidatos.length ) * 100).toFixed(2) } />

   <PainelCard 
   tipo='Vivendas Insoladas'
    total={vivendasInsoladas.length}
      porcentagem={((vivendasInsoladas.length/candidatos.length ) * 100).toFixed(2) } />
    </View>
    <View className='w-full'>
    <CandidateList />
    </View>
</View>
        </ScrollView>
    );
}