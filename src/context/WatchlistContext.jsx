import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const WatchlistContext = createContext();

export const useWatchlist = () => {
    return useContext(WatchlistContext);
};

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setWatchlist([]);
            return;
        }

        const q = query(collection(db, "watchlist"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const movies = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWatchlist(movies);
        });

        return unsubscribe;
    }, [user]);

    const addToWatchlist = async (movie) => {
        try {
            // Check if already in watchlist
            const q = query(
                collection(db, "watchlist"),
                where("userId", "==", user.uid),
                where("movieId", "==", movie.id)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                toast.info("Movie already in watchlist");
                return;
            }

            await addDoc(collection(db, "watchlist"), {
                userId: user.uid,
                movieId: movie.id,
                title: movie.title || movie.original_title,
                backdrop_path: movie.backdrop_path,
                poster_path: movie.poster_path,
                overview: movie.overview,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                addedAt: new Date(),
            });
            toast.success("Added to watchlist");
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            toast.error("Failed to add to watchlist");
        }
    };

    const removeFromWatchlist = async (watchlistId) => {
        try {
            await deleteDoc(doc(db, "watchlist", watchlistId));
            toast.success("Removed from watchlist");
        } catch (error) {
            console.error("Error removing from watchlist:", error);
            toast.error("Failed to remove from watchlist");
        }
    };

    const value = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
    };

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
};
