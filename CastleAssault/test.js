Dialog.show("event_energy_shop", this.genPopupHtml(), function () {
	e.is_popup_open= !1
}), this.is_popup_open= !0, this.initPopupContent(), this.update()
}, update: function () {
	if (this.is_popup_open) {
		var e=this.shop;
		$("#" + this.popup_element_id).find(".offer .btn").each(function () {
			var t=$(this), i=e.getOffer(t.data("section_id"), t.data("offer_index"));
			e.isOfferUseful(i) ? t.removeClass("btn-disabled") :t.addClass("btn-disabled")
		})
	}
}, genPopupHtml: function () {
	var t='<h3 class="popup_box_header">' + "Buy me" + "</h3>";
	return $.each(e.sections, function (e, i) {
		t+='<div class="energy-shop-section">', t+="<p>" + 'asdsd' + "</p>", $.each(i.offers, function (i, n) {
			var o=Format.ppCostTooltip(100);
			t+='<div class="offer"><img class="offer-image" src="' + n.image_src + '">' + s('<a href="#" class="btn btn-img tooltip" data-section_id="%1" data-offer_index="%2" title="%3"><img src="%4"> %5</a>', e, i, escapeHtml(o, !0), Format.image_src("resources/premium.png"), n.energy.amount_named) + "</div>"
		}), t+="</div>"
	}), t
},