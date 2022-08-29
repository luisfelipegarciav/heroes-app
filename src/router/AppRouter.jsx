import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { HeroesRoutes } from "../heroes"
import { PrivateRoute } from "../heroes/routes/PrivateRoute"
import { PublicRoute } from "../heroes/routes/PublicRoute"
import { Navbar } from "../ui"

export const AppRouter = () => {
    return (
        <>
            <Routes>

                <Route path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }>
                </Route>


                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRoutes />
                    </PrivateRoute>
                }>

                </Route>

                {/* <Route path="login" element={<LoginPage />} /> */}
                {/* <Route path="/*" element={<HeroesRoutes />} /> */}
            </Routes>
        </>
    )
}
