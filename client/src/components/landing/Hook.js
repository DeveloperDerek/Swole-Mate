import hook from "../../images/hook.jpg";

const Hook = () => {
    return(
        <section className="hook" id="about">
            <div className="hook-container">

            <div className="hook-text">
                <h2>Find your SwoleMate</h2>
                <p>Introducing Swole Mate...the newest innovative web app to hit the fitness industry.</p>

                <p>Swole Mate helps gym users find the perfect training partner, whether it's a short term partner if you are travelling or a long term partner to train at home with. Not only that! Users can connect with Gyms and Personal Trainers in their area. Simply book and pay for all you classes and sessions with the tap of a button.</p>

                <p>If you are a personal trainer or gym facility Swole Mate is your solution to a stress free booking system. Simply sign up, manage your schedule, add classes, take bookings, and take all your payments using our pocket sized app.</p>

                <p>Now there is no reason to get your business or body lean and strong as Swole Mate is available NOW!</p>
            </div>
            <div>
                <img src={hook} alt="girls working out" />
            </div>
            </div>
        </section>
    )
}

export default Hook