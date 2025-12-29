function DashboardLayout( {sidebar, children} ) {
    return (
        <div style = {{display: "flex", height: "calc(100vh - 60px)"}}>
            {sidebar}
            <main style = {{flex: 1, padding: "16px", overflowY: "auto"}}>
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout